import { LdoJsonldContext, LdSet } from "@ldo/ldo";

/**
 * =============================================================================
 * Typescript Typings for solidProfile
 * =============================================================================
 */

/**
 * simpleSolidProfile Type
 */
export interface simpleSolidProfile {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  type: LdSet<
    | {
        "@id": "Person";
      }
    | {
        "@id": "Person2";
      }
  >;
  name?: string;
}
