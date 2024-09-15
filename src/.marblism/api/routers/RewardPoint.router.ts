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

        createMany: procedure.input($Schema.RewardPointInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rewardPoint.createMany(input as any))),

        create: procedure.input($Schema.RewardPointInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rewardPoint.create(input as any))),

        deleteMany: procedure.input($Schema.RewardPointInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rewardPoint.deleteMany(input as any))),

        delete: procedure.input($Schema.RewardPointInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rewardPoint.delete(input as any))),

        findFirst: procedure.input($Schema.RewardPointInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).rewardPoint.findFirst(input as any))),

        findMany: procedure.input($Schema.RewardPointInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).rewardPoint.findMany(input as any))),

        findUnique: procedure.input($Schema.RewardPointInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).rewardPoint.findUnique(input as any))),

        updateMany: procedure.input($Schema.RewardPointInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rewardPoint.updateMany(input as any))),

        update: procedure.input($Schema.RewardPointInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).rewardPoint.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.RewardPointCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RewardPointCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RewardPointCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RewardPointCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.RewardPointCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RewardPointCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RewardPointGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RewardPointGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RewardPointCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RewardPointCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RewardPointGetPayload<T>, Context>) => Promise<Prisma.RewardPointGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.RewardPointDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RewardPointDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RewardPointDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RewardPointDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.RewardPointDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RewardPointDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RewardPointGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RewardPointGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RewardPointDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RewardPointDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RewardPointGetPayload<T>, Context>) => Promise<Prisma.RewardPointGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.RewardPointFindFirstArgs, TData = Prisma.RewardPointGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.RewardPointFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RewardPointGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RewardPointFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RewardPointFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RewardPointGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RewardPointGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.RewardPointFindManyArgs, TData = Array<Prisma.RewardPointGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.RewardPointFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.RewardPointGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RewardPointFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RewardPointFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.RewardPointGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.RewardPointGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.RewardPointFindUniqueArgs, TData = Prisma.RewardPointGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.RewardPointFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.RewardPointGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.RewardPointFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.RewardPointFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.RewardPointGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.RewardPointGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.RewardPointUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RewardPointUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RewardPointUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RewardPointUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.RewardPointUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.RewardPointUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.RewardPointGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.RewardPointGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.RewardPointUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.RewardPointUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.RewardPointGetPayload<T>, Context>) => Promise<Prisma.RewardPointGetPayload<T>>
            };

    };
}
