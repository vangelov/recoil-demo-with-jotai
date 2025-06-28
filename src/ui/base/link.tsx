import { UrlParamLink, Props as UrlParamLinkProps } from "./url-param-link";
import "./link.css";

type Props = UrlParamLinkProps;

export function Link({ className, ...rest }: Props) {
 
  return <UrlParamLink className={`Link ${className || ''}`} {...rest} />;
}
 