class ChessRules {
    board = new ChessBoard;

    constructor (board) {
        this.board = board;
    }

    validate (from, to, pawn, color)
    {
        if (pawn.type == 'p')
        {
            // move 2 square
            if (from.row == 2 && to.row == 4) return true;
            if (from.row == 7 && to.row == 5) return true;
        }


        // no rules always return false
        return false;
    }
}