import { useMemo, MouseEvent, HTMLAttributes } from "react";

export type Props = {
  name: string;
  value: string;
} & HTMLAttributes<HTMLAnchorElement>;

export function UrlParamLink({ name, value, ...rest }: Props) {
  const href = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(name, value);
    return `?${urlParams.toString()}`;
  }, [name, value]);

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (rest.onClick) rest.onClick(event);
  }

  return <a href={href} {...rest} onClick={onClick} />;
}
