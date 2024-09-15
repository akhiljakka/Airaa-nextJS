/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createAccountRouter from "./Account.router";
import createUserRouter from "./User.router";
import createSessionRouter from "./Session.router";
import createRoleRouter from "./Role.router";
import createCartRouter from "./Cart.router";
import createCartItemRouter from "./CartItem.router";
import createProductRouter from "./Product.router";
import createCategoryRouter from "./Category.router";
import createOrderItemRouter from "./OrderItem.router";
import createOrderRouter from "./Order.router";
import createRewardPointRouter from "./RewardPoint.router";
import createAddressRouter from "./Address.router";
import createCouponRouter from "./Coupon.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as SessionClientType } from "./Session.router";
import { ClientType as RoleClientType } from "./Role.router";
import { ClientType as CartClientType } from "./Cart.router";
import { ClientType as CartItemClientType } from "./CartItem.router";
import { ClientType as ProductClientType } from "./Product.router";
import { ClientType as CategoryClientType } from "./Category.router";
import { ClientType as OrderItemClientType } from "./OrderItem.router";
import { ClientType as OrderClientType } from "./Order.router";
import { ClientType as RewardPointClientType } from "./RewardPoint.router";
import { ClientType as AddressClientType } from "./Address.router";
import { ClientType as CouponClientType } from "./Coupon.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        account: createAccountRouter(router, procedure),
        user: createUserRouter(router, procedure),
        session: createSessionRouter(router, procedure),
        role: createRoleRouter(router, procedure),
        cart: createCartRouter(router, procedure),
        cartItem: createCartItemRouter(router, procedure),
        product: createProductRouter(router, procedure),
        category: createCategoryRouter(router, procedure),
        orderItem: createOrderItemRouter(router, procedure),
        order: createOrderRouter(router, procedure),
        rewardPoint: createRewardPointRouter(router, procedure),
        address: createAddressRouter(router, procedure),
        coupon: createCouponRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    account: AccountClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
    role: RoleClientType<AppRouter>;
    cart: CartClientType<AppRouter>;
    cartItem: CartItemClientType<AppRouter>;
    product: ProductClientType<AppRouter>;
    category: CategoryClientType<AppRouter>;
    orderItem: OrderItemClientType<AppRouter>;
    order: OrderClientType<AppRouter>;
    rewardPoint: RewardPointClientType<AppRouter>;
    address: AddressClientType<AppRouter>;
    coupon: CouponClientType<AppRouter>;
}
