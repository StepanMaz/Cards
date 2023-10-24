import type { Request as ExpressRequest } from "express";
import { HttpContextUser } from ".";

export type AuthorizedRequest = ExpressRequest & { user: HttpContextUser };
