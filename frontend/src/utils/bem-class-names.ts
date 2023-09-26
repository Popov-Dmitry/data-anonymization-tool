type Modifier = string | Record<string, unknown>;

const parseString = (baseClass: string, mod: string): string =>
  ` ${baseClass}--${mod}`;

const parseObject = (
  baseClass: string,
  mods: Record<string, unknown>
): string =>
  Object.keys(mods).reduce(
    (result: string, mod: string): string =>
      mods[mod] ? result + parseString(baseClass, mod) : result,
    ""
  );
const parseModifier = (baseClass: string, mod: Modifier): string =>
  mod && typeof mod === "string"
    ? parseString(baseClass, mod)
    : mod && typeof mod === "object"
    ? parseObject(baseClass, mod)
    : "";

export const bemModifier = (baseClass: string, ...mods: Modifier[]): string =>
  baseClass && typeof baseClass === "string"
    ? mods.reduce<string>(
        (result: string, mod: Modifier): string =>
          result + parseModifier(baseClass, mod),
        baseClass
      )
    : "";

export function bemElement(baseClass: string, element: string): string;
export function bemElement(baseClass: string): (element: string) => string;
export function bemElement(
  baseClass: string,
  ...args: unknown[]
): string | ((el: string) => string) {
  return typeof baseClass === "string" && baseClass
    ? typeof args[0] === "string" && args[0]
      ? `${baseClass}__${args[0]}`
      : args.length === 0
      ? (el: string): string => bemElement(baseClass, el)
      : ""
    : "";
}
