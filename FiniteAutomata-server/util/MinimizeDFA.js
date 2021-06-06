//reduction dfa
module.exports = (automata) => {
    //?
    automata.transitionTable.map((e) => {
        for (let i = 0; i < e.transition.length; i++) {
            if (e.transition[i] === '*') {
                e.transition.splice(i, 1);
            }
        }
    });
    automata.transitionTable.map((e) => {
        for (let i = 0; i < e.end.length; i++) {
            if (e.end[i] === '') {
                e.end.splice(i, 1);
            }
        }
    });
    let array, row, column, columns;
    let count = 0;
    let finalstate = [];
    let Endlength = automata.transitionTable[0].end.length;
    let States = [];
    let nonfinalStates = [];
    let nonfinalStateName = [];
    let nonDuplicate = [];
    let startstate = [];
    let boolean = [];
    let temp = [];
    let k = 0;
    let newTransitionTable = [{
        stateName: '',
        transition: automata.alphabet,
        end: [],
    }, ];
    //Seprate Finall and onFinalState
    function FindnonfinalState() {
        automata.transitionTable.forEach((element) => {
            States.push(element);
        });
        finalstate = States.filter((e) =>
            automata.finalStates.includes(e.stateName)
        );
        nonfinalStates = States.filter(
            (e) => !automata.finalStates.includes(e.stateName)
        );
        nonfinalStates.map((e) => {
            nonfinalStateName.push(e.stateName);
        });
        States.map((e) => {
            if (e.stateName == automata.startState) startstate.push(e);
        });
    }
    //Part 1 Finding Duplicate State
    function FindDuplicateStates() {
        let j = 0;
        let length;
        startstate[0].end.map((e) => {
            nonDuplicate.push(e);
        });
        nonDuplicate = [...new Set(nonDuplicate)];
        while (temp != nonDuplicate) {
            temp = nonDuplicate;
            for (j in States) {
                length = nonDuplicate.length;
                States.map((e) => {
                    if (e.stateName === nonDuplicate[j]) {
                        for (i in e.end) {
                            if (!nonDuplicate.includes(e.end[i])) {
                                nonDuplicate.push(e.end[i]);
                            }
                        }
                    }
                });
            }
        }
        // Answer First Part is nonDuplicate
        // console.log(nonDuplicate)
    }

    function FixFirstArray() {
        //Create Array
        array = new Array(States.length);
        for (let k = 0; k < array.length; k++) {
            //Problen with Array?
            array[k] = new Array(100);
        }
        //Enter The Name State
        for (row = 0; row < array.length; row++) {
            k = 0;
            for (column = 1; column <= States[row].end.length; column++) {
                array[row][0] = States[row].stateName;
                array[row][column] = States[row].end[k];
                k++;
            }
        }
        //Based Final OR onFinal
        for (row = 0; row < array.length; row++) {
            for (
                column = States[row].end.length + 1; column < States[row].end.length + 2; column++
            ) {
                if (!nonfinalStateName.includes(array[row][0])) {
                    array[row][column] = 1;
                } else {
                    array[row][column] = 0;
                }
            }
        }
    }

    function Set01Columns(first) {
        let t;
        InsertColumn();
        column = first + 1;
        for (let w = 0; w <= Endlength; w++) {
            column = first + w;
            if ((column - 1) % (Endlength + 1) == w) {
                for (row = 0; row < array.length; row++) {
                    t = array[row][w + 1];
                    for (let i = 0; i < array.length; i++) {
                        if (t === array[i][0]) {
                            array[row][column] = array[i][column - (w + 1)];
                        }
                    }
                }
            }
        }
    }

    function InsertColumn(number) {
        if (number !== undefined) {
            for (row = 0; row < array.length; row++) {
                for (let j = columns; j < columns + number; j++) {
                    array[row][j] = '';
                }
            }
            columns = columns + number;
        } else {
            for (row = 0; row < array.length; row++) {
                for (let j = columns; j < columns + Endlength + 1; j++) {
                    array[row][j] = '';
                }
            }
        }
    }

    function SetHardPart(num) {
        column = num;
        let found = false;
        let randomnumber = [];
        randomnumber[0] = 0;
        array[0][column] = 0;
        boolean = new Array(array.length);
        for (let k = 0; k < array.length; k++) {
            boolean[k] = false;
        }
        for (let m = 0; m < array.length; m++) {
            for (let k = m + 1; k < array.length; k++) {
                found = false;
                if (array[m][column - Endlength] === array[k][column - Endlength]) {
                    found = true;
                    for (let w = Endlength - 1; w > 0; w--) {
                        if (array[m][column - w] !== array[k][column - w]) {
                            found = false;
                        }
                    }
                }
                if (found) {
                    randomnumber[k] = randomnumber[m];
                    boolean[k] = true;
                    array[k][column] = randomnumber[k];
                } else {
                    if (!boolean[k]) {
                        if (
                            randomnumber[k] === undefined ||
                            randomnumber[m] + 1 > randomnumber[k]
                        ) {
                            randomnumber[k] = randomnumber[m] + 1;
                        }
                        array[k][column] = randomnumber[k];
                    }
                }
            }
        }
    }

    function LastPart() {
        for (let m = 0; m < array.length; m++) {
            for (let k = m + 1; k < array.length; k++) {
                found = true;

                for (let l = automata.alphabet.length; l < 100; l++) {
                    if (array[m][l] !== array[k][l]) {
                        found = false;
                        break;
                    }
                }
                if (found) {
                    for (let i = 1; i < automata.alphabet.length; i++) {
                        for (let j = 0; j < array.length; j++) {
                            if (array[j][i] === array[k][0]) {
                                array[j][i] = array[m][0];
                            }
                        }
                    }
                    if (array[k][0] == automata.startState)
                        automata.startState = array[m][0];
                    if (-1 !== findAlfabet(automata.finalStates, array[k][0]))
                        automata.finalStates[
                            findAlfabet(automata.finalStates, array[k][0])
                        ] = array[m][0];
                    array[k][0] = array[m][0];
                }
            }
        }
    }

    function Same(column) {
        let flage = true;
        if ((column - Endlength) % (Endlength + 1) === 1) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][column - (Endlength + 1)] !== array[i][column]) {
                    flage = false;
                }
            }
        } else {
            flage = false;
        }
        return flage;
    }
    //-----------------------------------------
    function Standardization() {
        for (let i = 0; i < array.length; i++) {
            if (i === 0) {
                newTransitionTable[0].stateName = array[0][0];
                newTransitionTable[0].end = [];
                for (let j = 1; j < automata.alphabet.length; j++) {
                    newTransitionTable[newTransitionTable.length - 1].end.push(
                        array[i][j]
                    );
                }
                newTransitionTable[newTransitionTable.length - 1].end.push('');
            } else {
                if (-1 === findStateName(newTransitionTable, array[i][0])) {
                    let str = array[i][0];
                    newTransitionTable.push({
                        stateName: str,
                        transition: automata.alphabet,
                        end: [],
                    });
                    for (let j = 1; j < automata.alphabet.length; j++) {
                        newTransitionTable[newTransitionTable.length - 1].end.push(
                            array[i][j]
                        );
                    }
                    newTransitionTable[newTransitionTable.length - 1].end.push('');
                }
            }
        }

        automata.transitionTable = newTransitionTable;
    }

    function findStateName(arr, name) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].stateName === name) {
                return j;
            }
        }
        return -1;
    }

    function findAlfabet(arr, name) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] === name) {
                return j;
            }
        }
        return -1;
    }
    //-------------------------------------------
    // main function
    function MinimizeDFA() {
        //move start state to first row of transitionTable

        let transitionTable1;
        for (let r = 0; r < automata.transitionTable.length; r++) {
            if (automata.transitionTable[r].stateName === automata.startState) {
                transitionTable1 = automata.transitionTable[r];
                automata.transitionTable[r] = automata.transitionTable[0];
                automata.transitionTable[0] = transitionTable1;
            }
        }
        FindnonfinalState();
        FindDuplicateStates();
        FixFirstArray();
        count = Endlength + 1;
        // Do Function untill being same
        while (!Same(count)) {
            count = count + 1;
            Set01Columns(count);
            count = count + Endlength;
            SetHardPart(count);
        }
        LastPart();
        Standardization();
    }
    MinimizeDFA();
    console.log(automata);
    console.table(array);

    return automata;
}