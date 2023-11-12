import { NextPage } from 'next'
import { ReactNode } from 'react';

export type TypeRoles = { isOnlyAdmin?: boolean; isOnlyContractor?: boolean }

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles, children: ReactNode }
