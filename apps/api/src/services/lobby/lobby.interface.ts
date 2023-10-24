export interface Lobby<TMember> {
    readonly owner: TMember;
    readonly members: TMember[];
    addMemebr(member: TMember): void;
    removeMember(member: TMember): void;
}
