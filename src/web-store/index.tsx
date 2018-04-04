import { Icon } from "antd"
import { Connect } from "dob-react"
import * as React from "react"
import * as S from "./style"
import { Props, State } from "./type"

const TreeIcon = (props: any) => <Icon style={{ marginRight: 5 }} {...props} />

@Connect
class View extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return <S.Container>Stores Info: TODO</S.Container>
  }
}

export default {
  position: "tree-stores",
  view: View,
  init: (applicationAction: any) => {
    applicationAction.event.on("freshProjectStatus", () => {
      const dobInfo = applicationAction.applicationStore.status.analyseInfo.projectAnalyseDob
      if (dobInfo) {
        applicationAction.pipeTreeNode((treeData: any) => {
          treeData[0].children.push({
            key: "stores",
            title: `Stores (${dobInfo.storeFiles.length})`,
            icon: <TreeIcon type="database" />,
            disabled: dobInfo.storeFiles.length === 0,
            children: dobInfo.storeFiles.map((storeFile: any, index: number) => {
              return {
                key: index,
                title: storeFile.name,
                icon: <TreeIcon type="database" />
              }
            })
          })
          return treeData
        })
      }
    })
  }
}
