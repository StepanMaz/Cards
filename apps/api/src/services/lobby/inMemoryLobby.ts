import { type Lobby as ILobby } from ".";

export class Lobby<TMember> implements ILobby<TMember> {
    members: TMember[] = [];

    constructor(public owner: TMember) {}

    addMemebr(member: TMember): void {
        this.members.push(member);
    }

    removeMember(member: TMember): void {
        const index = this.members.indexOf(member);
        if (index != -1) {
            this.members.splice(index, 1);
        }
    }
}
