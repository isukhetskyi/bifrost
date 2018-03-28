import * as React from "react";
import * as PesistentDrawer from "./PersistentDrawer";

export interface LayoutProps {
  children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps , {}> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }


  render() {
      return (
      <PesistentDrawer.default/>
    );
  }
}

export default Layout;