import { UrlParamLink, Props as UrlParamLinkProps } from "./url-param-link";
import "./button-link.css";

type Props = UrlParamLinkProps;

export function ButtonLink({ ...rest }: Props) {
  return <UrlParamLink className="ButtonLink" {...rest} />;
}
