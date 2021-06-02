let automata = {
    alphabet: ['a', 'b', '*'],
    transitionTable: [{
            stateName: '1',
            transition: ['a', 'b', '*'],
            end: ['', '2', '01'],
        },
        {
            stateName: '2',
            transition: ['a', 'b', '*'],
            end: ['', '02', '2'],
        },
        {
            stateName: '0',
            transition: ['a', 'b', '*'],
            end: ['0', '1', '0'],
        },
    ],
    startState: '0',
    finalStates: ['2']
}

module.exports = (automata) => {

    let transitionTable1;
    for (let r = 0; r < automata.transitionTable.length; r++) {
        if (automata.transitionTable[r].stateName === automata.startState) {
            transitionTable1 = automata.transitionTable[r];
            automata.transitionTable[r] = automata.transitionTable[0];
            automata.transitionTable[0] = transitionTable1;
        }
    }
    
    let indexOfLambda = automata.transitionTable[0].transition.length - 1;
    
    //complete the stateName of first row of newAutomata.transitionTable
    let newAutomata = {
        alphabet: automata.alphabet,
        transitionTable: [
            {
                stateName: automata.transitionTable[0].stateName,
                transition: automata.transitionTable[0].transition,
                end: [],
            }
        ],
        startState: automata.startState,
        finalStates: [] //!
    };
    
    //complete the end of first row of newAutomata.transitionTable
    for (let tr = 0; tr < automata.transitionTable[0].transition.length - 1; tr++) {
        let TransitionStatus;
        try {
            TransitionStatus = automata.transitionTable[0].end[tr].split('');
        } catch (err) {
            break;
        }
    
        let lambdaTrasition = '';
        if (newAutomata.transitionTable[0].end[tr] !== undefined) {
            lambdaTrasition = newAutomata.transitionTable[0].end[tr];
        }
        for (let x = 0; x < TransitionStatus.length; x++) {
            let TransitionStatus = automata.transitionTable[0].end[tr].split('');
            //find the stateName in automata.transitionTable that equal to TransitionStatus(split of automata.transitionTable of end)
            let index = findStateName(automata.transitionTable, TransitionStatus[x]);
    
            //read the last index of automata.transitionTable.end (*) for add that to newAutomata.transitionTable.end
            if (
                findAlfabet(
                    lambdaTrasition,
                    automata.transitionTable[index].end[indexOfLambda]
                ) === -1
            )
                lambdaTrasition += automata.transitionTable[index].end[indexOfLambda];
        }
    
        lambdaTrasition = lambdaTrasition.split('').sort().join('');
        newAutomata.transitionTable[0].end[tr] = lambdaTrasition;
    
    }
    
    //complete the another row of newAutomata.transitionTable
    for (let i = 0; true; i++) {
        //if element of end of newAutomata.transitionTable does not exist on stateName of newAutomata.transitionTable, add that to stateName of newAutomata.transitionTable
        for (let e = 0; e < newAutomata.transitionTable[i].end.length; e++) {
            if (newAutomata.transitionTable[i].end[e] !== '') {
                if (
                    findStateName(
                        newAutomata.transitionTable,
                        newAutomata.transitionTable[i].end[e]
                    ) === -1
                ) {
                    newAutomata.transitionTable.push({
                        stateName: newAutomata.transitionTable[i].end[e],
                        transition: automata.transitionTable[0].transition,
                        end: [],
                        // position: '',
                    });
                }
            }
        }
    
        //complete the end of newAutomata.transitionTable
        let splitStateName_newTransitionTable;
        try {
            splitStateName_newTransitionTable = newAutomata.transitionTable[
                i + 1
            ].stateName.split('');
        } catch (err) {
            break;
        }
    
        //find the stateName in newAutomata.transitionTable that equal to splitStateName_newTransitionTable
        for (let n = 0; n < splitStateName_newTransitionTable.length; n++) {
            let num = findStateName(
                automata.transitionTable,
                splitStateName_newTransitionTable[n]
            );

            for (let tr = 0; tr < automata.transitionTable[0].transition.length - 1; tr++) {
                let TransitionStatus = automata.transitionTable[num].end[tr].split('');
    
                let lambdaTrasition = '';
                if (newAutomata.transitionTable[i + 1].end[tr] !== undefined) {
                    lambdaTrasition = newAutomata.transitionTable[i + 1].end[tr];
                }
                for (let x = 0; x < TransitionStatus.length; x++) {
                    //find the stateName in automata.transitionTable that equal to TransitionStatus(split of automata.transitionTable of end)
                    let index = findStateName(automata.transitionTable, TransitionStatus[x]);
    
                    //read the last index of automata.transitionTable.end (*) for add that to newAutomata.transitionTable.end
                    if (
                        findAlfabet(
                            lambdaTrasition,
                            automata.transitionTable[index].end[indexOfLambda]
                        ) === -1
                    ) {
                        lambdaTrasition +=
                        automata.transitionTable[index].end[indexOfLambda];
                    }
                }
    
                lambdaTrasition = lambdaTrasition.split('').sort().join('');
                newAutomata.transitionTable[i + 1].end[tr] = lambdaTrasition;
            }
        }
    }
    
    //set final state
    let setposition = [];
    for (let o = 0; o < automata.transitionTable.length; o++) {
        for (let w = 0; w < automata.finalStates.length; w++) {
        
            if (automata.transitionTable[o].stateName === automata.finalStates[w]) {
                setposition.push(automata.transitionTable[o].stateName);
            }
        }
    }
  
    for (let p = 0; p < newAutomata.transitionTable.length; p++) {
        for (let a = 0; a < setposition.length; a++) {
            if (
                findAlfabet(newAutomata.transitionTable[p].stateName, setposition[a]) !== -1
            ) {
                newAutomata.finalStates = [...newAutomata.finalStates, newAutomata.transitionTable[p].stateName];
            }
        }
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
    console.log(automata);
    console.log(newAutomata);

    return newAutomata;

}