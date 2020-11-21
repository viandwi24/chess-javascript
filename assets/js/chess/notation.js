class ChessNotation {
    board = new ChessBoard;
    notation = null;
    turn = null;

    constructor (board, notation, turn = 'w')
    {
        this.board = board;
        this.notation = notation;
        this.turn = turn;
    }

    translateRow (row, toIndex = true)
    {
        var int = [0,1,2,3,4,5,6,7];
        return (toIndex)
            ? (int.reverse()[row-1])
            : (int.reverse()[row]+1);
    }

    translateCol (col, toIndex = true)
    {
        var int = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        return (toIndex)
            ? (int.findIndex(e => e === col))
            : (int[col]);
    }


    read ()
    {
        // 
        var from = { row: 0, col: 0 };
        var to = { row: 0, col: 0 };
        var success = true;

        // 
        var notationLength = this.notation.length;
        var notation = this.notation.split('')
        if (notationLength == 2)
        {
            // find to
            to.col = notation[0]
            to.row = notation[1]

            // find from
            var boardState = this.board.state;
            var possibleMove = [];
            for (let i = 0; i < boardState.length; i++) {
                const e = boardState[i];
                possibleMove.push({
                    ...e[this.translateCol(to.col)],
                    row: (this.translateRow(i)),
                    col: to.col
                })
            }

            // eliminate
            possibleMove = possibleMove.filter(e => e.color === this.turn) // just turn player
            possibleMove = possibleMove.filter(e => e.type === 'p') // just pawn
            possibleMove = possibleMove.sort((a,b) => b.row - a.row ) // just in top pawn
            
            // 
            if (possibleMove.length > 0)
            {
                var result = possibleMove[0];
                from.col = result.col;
                from.row = result.row;

                console.log(
                    (new ChessRules(this.board)).validate(from, to, result, result.color)
                )
            } else { success = false; }
        }


        // 
        return {
            success,
            color: this.turn,
            notation: this.notation,
            board: this.board,
            from,
            to
        }
    }
}