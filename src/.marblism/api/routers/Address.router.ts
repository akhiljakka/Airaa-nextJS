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

        createMany: procedure.input($Schema.AddressInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).address.createMany(input as any))),

        create: procedure.input($Schema.AddressInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).address.create(input as any))),

        deleteMany: procedure.input($Schema.AddressInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).address.deleteMany(input as any))),

        delete: procedure.input($Schema.AddressInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).address.delete(input as any))),

        findFirst: procedure.input($Schema.AddressInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).address.findFirst(input as any))),

        findMany: procedure.input($Schema.AddressInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).address.findMany(input as any))),

        findUnique: procedure.input($Schema.AddressInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).address.findUnique(input as any))),

        updateMany: procedure.input($Schema.AddressInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).address.updateMany(input as any))),

        update: procedure.input($Schema.AddressInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).address.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AddressCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AddressCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AddressCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AddressCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AddressCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AddressCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AddressGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AddressGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AddressCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AddressCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AddressGetPayload<T>, Context>) => Promise<Prisma.AddressGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AddressDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AddressDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AddressDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AddressDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AddressDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AddressDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AddressGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AddressGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AddressDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AddressDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AddressGetPayload<T>, Context>) => Promise<Prisma.AddressGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AddressFindFirstArgs, TData = Prisma.AddressGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AddressFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AddressGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AddressFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AddressFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AddressGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AddressGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AddressFindManyArgs, TData = Array<Prisma.AddressGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.AddressFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AddressGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AddressFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AddressFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AddressGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AddressGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AddressFindUniqueArgs, TData = Prisma.AddressGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AddressFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AddressGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AddressFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AddressFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AddressGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AddressGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AddressUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AddressUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AddressUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AddressUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AddressUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AddressUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AddressGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AddressGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AddressUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AddressUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AddressGetPayload<T>, Context>) => Promise<Prisma.AddressGetPayload<T>>
            };

    };
}
