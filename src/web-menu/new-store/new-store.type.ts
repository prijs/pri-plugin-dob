export class Props {
  public form?: any;
  public onSuccess?: () => void = () => {
    //
  };
  [x: string]: any;
}

export class State {
  public visible = false;
}
