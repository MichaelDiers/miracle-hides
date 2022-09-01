import { Type } from '@nestjs/common';
import { IntersectionType } from '@nestjs/swagger';

export function intersectionHelper2<A, B>(
	classARef: Type<A>,
	classBRef: Type<B>,
) : Type<A & B> {
	return IntersectionType(classARef, classBRef);
}

export function intersectionHelper3<A, B, C>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
) : Type<A & B & C> {
	return intersectionHelper2(
		classARef,
		intersectionHelper2(
			classBRef,
			classCRef,
		),
	);
}

export function intersectionHelper4<A, B, C, D>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
) : Type<A & B & C & D> {
	return intersectionHelper2(
		classARef,
		intersectionHelper3(
			classBRef,
			classCRef,
			classDRef,
		),
	);
}

export function intersectionHelper5<A, B, C, D, E>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
) : Type<A & B & C & D & E> {
	return intersectionHelper2(
		classARef,
		intersectionHelper4(
			classBRef,
			classCRef,
			classDRef,
			classERef,
		),
	);
}

export function intersectionHelper6<A, B, C, D, E, F>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
) : Type<A & B & C & D & E & F> {
	return intersectionHelper2(
		classARef,
		intersectionHelper5(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
		),
	);
}

export function intersectionHelper7<A, B, C, D, E, F, G>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
) : Type<A & B & C & D & E & F & G> {
	return intersectionHelper2(
		classARef,
		intersectionHelper6(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
		),
	);
}

export function intersectionHelper8<A, B, C, D, E, F, G, H>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
) : Type<A & B & C & D & E & F & G & H> {
	return intersectionHelper2(
		classARef,
		intersectionHelper7(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
		),
	);
}

export function intersectionHelper9<A, B, C, D, E, F, G, H, I>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
) : Type<A & B & C & D & E & F & G & H & I> {
	return intersectionHelper2(
		classARef,
		intersectionHelper8(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
		),
	);
}

export function intersectionHelper10<A, B, C, D, E, F, G, H, I, J>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
) : Type<A & B & C & D & E & F & G & H & I & J> {
	return intersectionHelper2(
		classARef,
		intersectionHelper9(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
		),
	);
}

export function intersectionHelper11<A, B, C, D, E, F, G, H, I, J, K>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
) : Type<A & B & C & D & E & F & G & H & I & J & K> {
	return intersectionHelper2(
		classARef,
		intersectionHelper10(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
		),
	);
}

export function intersectionHelper12<A, B, C, D, E, F, G, H, I, J, K, L>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L> {
	return intersectionHelper2(
		classARef,
		intersectionHelper11(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
		),
	);
}

export function intersectionHelper13<A, B, C, D, E, F, G, H, I, J, K, L, M>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M> {
	return intersectionHelper2(
		classARef,
		intersectionHelper12(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
		),
	);
}

export function intersectionHelper14<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N> {
	return intersectionHelper2(
		classARef,
		intersectionHelper13(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
		),
	);
}

export function intersectionHelper15<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O> {
	return intersectionHelper2(
		classARef,
		intersectionHelper14(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
		),
	);
}

export function intersectionHelper16<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P> {
	return intersectionHelper2(
		classARef,
		intersectionHelper15(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
		),
	);
}

export function intersectionHelper17<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q> {
	return intersectionHelper2(
		classARef,
		intersectionHelper16(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
		),
	);
}

export function intersectionHelper18<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
	classRRef: Type<R>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R> {
	return intersectionHelper2(
		classARef,
		intersectionHelper17(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
			classRRef,
		),
	);
}

export function intersectionHelper19<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
	classRRef: Type<R>,
	classSRef: Type<S>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S> {
	return intersectionHelper2(
		classARef,
		intersectionHelper18(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
			classRRef,
			classSRef,
		),
	);
}

export function intersectionHelper20<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
	classRRef: Type<R>,
	classSRef: Type<S>,
	classTRef: Type<T>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T> {
	return intersectionHelper2(
		classARef,
		intersectionHelper19(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
			classRRef,
			classSRef,
			classTRef,
		),
	);
}

export function intersectionHelper21<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
	classRRef: Type<R>,
	classSRef: Type<S>,
	classTRef: Type<T>,
	classURef: Type<U>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U> {
	return intersectionHelper2(
		classARef,
		intersectionHelper20(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
			classRRef,
			classSRef,
			classTRef,
			classURef,
		),
	);
}

export function intersectionHelper22<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
	classRRef: Type<R>,
	classSRef: Type<S>,
	classTRef: Type<T>,
	classURef: Type<U>,
	classVRef: Type<V>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V> {
	return intersectionHelper2(
		classARef,
		intersectionHelper21(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
			classRRef,
			classSRef,
			classTRef,
			classURef,
			classVRef,
		),
	);
}

export function intersectionHelper23<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
	classRRef: Type<R>,
	classSRef: Type<S>,
	classTRef: Type<T>,
	classURef: Type<U>,
	classVRef: Type<V>,
	classWRef: Type<W>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W> {
	return intersectionHelper2(
		classARef,
		intersectionHelper22(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
			classRRef,
			classSRef,
			classTRef,
			classURef,
			classVRef,
			classWRef,
		),
	);
}

export function intersectionHelper24<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
	classRRef: Type<R>,
	classSRef: Type<S>,
	classTRef: Type<T>,
	classURef: Type<U>,
	classVRef: Type<V>,
	classWRef: Type<W>,
	classXRef: Type<X>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X> {
	return intersectionHelper2(
		classARef,
		intersectionHelper23(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
			classRRef,
			classSRef,
			classTRef,
			classURef,
			classVRef,
			classWRef,
			classXRef,
		),
	);
}

export function intersectionHelper25<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>(
	classARef: Type<A>,
	classBRef: Type<B>,
	classCRef: Type<C>,
	classDRef: Type<D>,
	classERef: Type<E>,
	classFRef: Type<F>,
	classGRef: Type<G>,
	classHRef: Type<H>,
	classIRef: Type<I>,
	classJRef: Type<J>,
	classKRef: Type<K>,
	classLRef: Type<L>,
	classMRef: Type<M>,
	classNRef: Type<N>,
	classORef: Type<O>,
	classPRef: Type<P>,
	classQRef: Type<Q>,
	classRRef: Type<R>,
	classSRef: Type<S>,
	classTRef: Type<T>,
	classURef: Type<U>,
	classVRef: Type<V>,
	classWRef: Type<W>,
	classXRef: Type<X>,
	classYRef: Type<Y>,
) : Type<A & B & C & D & E & F & G & H & I & J & K & L & M & N & O & P & Q & R & S & T & U & V & W & X & Y> {
	return intersectionHelper2(
		classARef,
		intersectionHelper24(
			classBRef,
			classCRef,
			classDRef,
			classERef,
			classFRef,
			classGRef,
			classHRef,
			classIRef,
			classJRef,
			classKRef,
			classLRef,
			classMRef,
			classNRef,
			classORef,
			classPRef,
			classQRef,
			classRRef,
			classSRef,
			classTRef,
			classURef,
			classVRef,
			classWRef,
			classXRef,
			classYRef,
		),
	);
}
