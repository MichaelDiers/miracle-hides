const functions = require('@google-cloud/functions-framework');
const { ArtifactRegistryClient, protos: { IRepository } } = require('@google-cloud/artifact-registry');

const LOCATIONS = [
  'us-central1',
];

const PROJECTS = [
  'miracle-hides',
];

/**
 * Iterate all docker images of the given repository without a tag.
 * Extracts the sha from the docker uri and returns it. 
 * @param {ArtifactRegistryClient} client Client for accessing the artifact registry.
 * @param {IRepository[]} repository an object containing the repository data.
 */
async function* iterateImageShas(client, repository) {
  const iterableDocker = await client.listDockerImagesAsync({ parent: repository.name });
  for await (docker of iterableDocker) {
    if (docker.tags.length !== 0) {
      continue;
    }

    const sha = docker.uri.split('@sha');
    if (sha.length === 2) {
      yield sha[1];
    }
  }
}

/**
 * Iterator for all docker repositories of the given projects and locations.
 * @param {ArtifactRegistryClient} client Client for accessing the artifact registry.
 * @param {string[]} projects The names of all projects, like your-project-name.
 * @param {string[]} locations The names of all locations, like uscentral-1.
 */
async function* iterateRepositoriesAsync(client, projects, locations) {
  for (project of PROJECTS) {
    for (location of LOCATIONS) {
      const iterable = await client.listRepositoriesAsync({
        parent: `projects/${project}/locations/${location}`,
      });

      for await (repository of iterable) {
        if (repository.format.toUpperCase() !== 'DOCKER') {
          continue;
        }

        yield repository;
      }
    }
  }
}

/**
 * Lists all versions of a given repository.
 * @param {ArtifactRegistryClient} client Client for accessing the artifact registry.
 * @param {IRepository} repository The repository for that the versions are listed.
 * @returns A string[] containing the name of the versions.
 */
const listVersionsAsync = async (client, repository) => {
  const versions = [];
  const iterablePackages = await client.listPackagesAsync({ parent: repository.name });
  for await (package of iterablePackages) {
    const iterableVersions = await client.listVersionsAsync({ parent: package.name });
    for await (version of iterableVersions) {
      versions.push(version.name);
    }
  }

  return versions;
}

/**
 * Google cloud http function.
 */
functions.http('cloudCleanUp', async (req, res) => {
  let deleted = 0;

  const client = new ArtifactRegistryClient();
  for await (repository of iterateRepositoriesAsync(client, PROJECTS, LOCATIONS)) {
    const versions = await listVersionsAsync(client, repository);

    for await (imageSha of iterateImageShas(client, repository)) {
      const versionIndex = versions.findIndex((version) => version.endsWith(imageSha));
      if (versionIndex < 0) {
        continue;
      }
      
      const [operation] = await client.deleteVersion({ name: versions[versionIndex] })
      await operation.promise();
      versions.splice(versionIndex, 1);
      deleted += 1;
    }
  }
  
  res.send(`deleted ${deleted} docker images`);
});
