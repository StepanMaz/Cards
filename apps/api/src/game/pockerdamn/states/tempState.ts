import { State } from ".";

export class TempState extends State {
    constructor(private readonly setNext: () => void) {
        super();
    }

    activate() {
        this.setNext();
    }
}