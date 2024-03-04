import { ComponentType, LazyExoticComponent } from "react";

export interface Route {
  path: string;
  name: string;
  element: LazyExoticComponent<ComponentType<any>> | null;
}

export interface RootState {
  sidebarUnfoldable?: boolean;
  sidebarShow: boolean;
}

export interface NavItem {
  component: React.ComponentType<any>;
  name: string;
  to?: string;
  href?: string;
  icon: JSX.Element;
  badge?: {
    color: string;
    text: string;
  };
  items?: NavItem[];
  moduleName : string;
}

export interface DocsCalloutProps {
  content: string;
  href: string;
  name: string;
}

export interface DocsLinkProps {
  href?: string;
  name?: string;
  text?: string;
}

export interface DocsExampleProps {
  children: React.ReactNode;
  href: string;
}

export interface ThemeColorProps {
  children?: React.ReactNode;
  className?: string;
}