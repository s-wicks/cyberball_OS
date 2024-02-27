
class ThrowGroup {
  public throwers: boolean[] = [];
  public target: number = -1;
}

class Throw {
  public throw_groups: ThrowGroup[] = [];
}

export class Scheduler {
  public throw_data: Throw[] = [];
  public throwers = ["P1", "P2", "P3", "P4"];

  addThrow() {
    this.throw_data.push(new Throw());
  }

  removeThrow(index: number) {
    this.throw_data.splice(index, 1);
  }

  addThrower(throw_block: Throw) {
    let throw_group = new ThrowGroup();
    throw_group.throwers = new Array(this.throwers.length).fill(false);
    throw_block.throw_groups.push(throw_group);
  }

  removeThrower(throw_block: Throw, index: number) {
    throw_block.throw_groups.splice(index, 1);
  }
}
