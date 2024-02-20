import { NextPage } from "next";
import { ReactNode } from "react";

export type TypeRoles = { isOnlyAdmin?: boolean; isOnlyContractor?: boolean };

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles;

export type TypeComponentAuthFields = {
  children: React.ReactNode;
  Component: {
    isOnlyAdmin: boolean;
    isOnlyContractor: boolean;
  };
};
// Component: TypeRoles,
