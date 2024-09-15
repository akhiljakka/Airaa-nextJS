/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.CouponInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).coupon.createMany(input as any))),

        create: procedure.input($Schema.CouponInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).coupon.create(input as any))),

        deleteMany: procedure.input($Schema.CouponInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).coupon.deleteMany(input as any))),

        delete: procedure.input($Schema.CouponInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).coupon.delete(input as any))),

        findFirst: procedure.input($Schema.CouponInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).coupon.findFirst(input as any))),

        findMany: procedure.input($Schema.CouponInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).coupon.findMany(input as any))),

        findUnique: procedure.input($Schema.CouponInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).coupon.findUnique(input as any))),

        updateMany: procedure.input($Schema.CouponInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).coupon.updateMany(input as any))),

        update: procedure.input($Schema.CouponInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).coupon.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CouponCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CouponCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CouponCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CouponCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CouponCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CouponCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CouponGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CouponGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CouponCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CouponCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CouponGetPayload<T>, Context>) => Promise<Prisma.CouponGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CouponDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CouponDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CouponDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CouponDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CouponDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CouponDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CouponGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CouponGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CouponDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CouponDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CouponGetPayload<T>, Context>) => Promise<Prisma.CouponGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CouponFindFirstArgs, TData = Prisma.CouponGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CouponFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CouponGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CouponFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CouponFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CouponGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CouponGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CouponFindManyArgs, TData = Array<Prisma.CouponGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.CouponFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CouponGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CouponFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CouponFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CouponGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CouponGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CouponFindUniqueArgs, TData = Prisma.CouponGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CouponFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CouponGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CouponFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CouponFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CouponGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CouponGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CouponUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CouponUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CouponUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CouponUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CouponUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CouponUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CouponGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CouponGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CouponUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CouponUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CouponGetPayload<T>, Context>) => Promise<Prisma.CouponGetPayload<T>>
            };

    };
}
