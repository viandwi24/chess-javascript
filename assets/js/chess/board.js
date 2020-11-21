class ChessBoard
{
    state = [];

    constructor (state = null)
    {
        if (state != null)
        {
            this.state = state;
        } else {
            this.state = this.resetState();
            this.state = this.fillPawns(this.state);
        }
    }

    resetState ()
    {
        var state = [];
        for (let i = 0; i < 8; i++) {
            var tmp = [];
            for (let j = 0; j < 8; j++) {
                tmp.push({
                    type: '',
                    color: ''// (i % 2 == 0) ? ((j % 2 == 0) ? 'w' : 'b') : ((j % 2 == 0) ? 'b' : 'w')
                })
            }
            state.push(tmp)
        }
        return state;
    }

    fillPawns (state)
    {
        var board = new ChessBoard(state);

        // white
        board.fillPawn(2, 'a', 'w', 'p');
        board.fillPawn(2, 'b', 'w', 'p');
        board.fillPawn(2, 'c', 'w', 'p');
        board.fillPawn(2, 'd', 'w', 'p');
        board.fillPawn(2, 'e', 'w', 'p');
        board.fillPawn(2, 'f', 'w', 'p');
        board.fillPawn(2, 'g', 'w', 'p');
        board.fillPawn(2, 'h', 'w', 'p');
        board.fillPawn(1, 'a', 'w', 'r');
        board.fillPawn(1, 'h', 'w', 'r');
        board.fillPawn(1, 'b', 'w', 'k');
        board.fillPawn(1, 'g', 'w', 'k');
        board.fillPawn(1, 'c', 'w', 'b');
        board.fillPawn(1, 'f', 'w', 'b');
        board.fillPawn(1, 'd', 'w', 'q');
        board.fillPawn(1, 'e', 'w', 'k');
        
        // black
        board.fillPawn(7, 'a', 'b', 'p');
        board.fillPawn(7, 'b', 'b', 'p');
        board.fillPawn(7, 'c', 'b', 'p');
        board.fillPawn(7, 'd', 'b', 'p');
        board.fillPawn(7, 'e', 'b', 'p');
        board.fillPawn(7, 'f', 'b', 'p');
        board.fillPawn(7, 'g', 'b', 'p');
        board.fillPawn(7, 'h', 'b', 'p');
        board.fillPawn(8, 'a', 'b', 'r');
        board.fillPawn(8, 'h', 'b', 'r');
        board.fillPawn(8, 'b', 'b', 'k');
        board.fillPawn(8, 'g', 'b', 'k');
        board.fillPawn(8, 'c', 'b', 'b');
        board.fillPawn(8, 'f', 'b', 'b');
        board.fillPawn(8, 'd', 'b', 'q');
        board.fillPawn(8, 'e', 'b', 'k');
        
        // 
        return board.state;
    }

    fillPawn (row, col, color, type)
    {
        this.state[this.translateRow(row)][this.translateCol(col)].type = type;
        this.state[this.translateRow(row)][this.translateCol(col)].color = color;
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

    ascii (printConsole = false)
    {
        var result = '';

        // 
        result += '  +------------------------+\n';

        //
        var row = 8;
        for (let i = 0; i < this.state.length; i++) {
            const cols = this.state[i];
            
            // 
            result += `${(row)} |`;
            row--;

            // 
            for (let j = 0; j < cols.length; j++) {
                var e = cols[j];

                if (e.type == '')
                {
                    result += ' . ';
                } else {
                    result += ` ${e.type} `;
                }
            }

            // 
            result += '| \n';
        }

        // 
        result += '  +------------------------+\n    a  b  c  d  e  f  g  h';

        // 
        if (printConsole) console.log(result);
        return result;
    }

    move (notation, turn = 'w')
    {
        try {
            var notation = new ChessNotation(this, notation, turn);
            var result = notation.read();
            var pawn = {...this.state[this.translateRow(result.from.row)][this.translateCol(result.from.col)]};

            // del
            this.fillPawn(result.from.row, result.from.col, '', '');

            // move
            this.fillPawn(result.to.row, result.to.col, pawn.color, pawn.type);
        } catch (error) {
            return false;
        }

        // 
        return true;
    }
}