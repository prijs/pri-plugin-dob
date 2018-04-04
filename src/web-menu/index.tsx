import { Icon } from "antd"
import { Connect } from "dob-react"
import * as React from "react"
import { NewStoreComponent } from "./new-store/new-store.component"
import * as S from "./style"
import { Props, State } from "./type"

const TreeIcon = (props: any) => <Icon style={{ marginRight: 5 }} {...props} />

@Connect
class View extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return <NewStoreComponent />
  }
}

export default {
  position: "menu",
  view: View
}
