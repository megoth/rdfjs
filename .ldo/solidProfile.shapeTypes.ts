import { ShapeType } from "@ldo/ldo";
import { solidProfileSchema } from "./solidProfile.schema";
import { solidProfileContext } from "./solidProfile.context";
import { simpleSolidProfile } from "./solidProfile.typings";

/**
 * =============================================================================
 * LDO ShapeTypes solidProfile
 * =============================================================================
 */

/**
 * simpleSolidProfile ShapeType
 */
export const simpleSolidProfileShapeType: ShapeType<simpleSolidProfile> = {
  schema: solidProfileSchema,
  shape: "https://ldo.js.org/shapes/solid-profile.ttl#simpleSolidProfile",
  context: solidProfileContext,
};
