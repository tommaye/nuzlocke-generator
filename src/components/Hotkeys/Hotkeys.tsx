import * as React from 'react';
import { connect } from 'react-redux';
import { reducers } from 'reducers';
import { selectPokemon, deletePokemon } from 'actions';
import { Pokemon } from 'models';
import { sortPokes, sortPokesReverse, noop } from 'utils';
import { selectedId } from 'reducers/selectedId';
import { hotkeyList } from 'utils';

export interface HotkeysProps {
    selectPokemon: selectPokemon;
    deletePokemon: deletePokemon;
    pokemon: Pokemon[];
    selectedId: string;
}

export class HotkeysBase extends React.PureComponent<HotkeysProps> {
    public globalHotkeysEvents: any;

    constructor(props) {
        super(props);
        this.globalHotkeysEvents = {
            handleKeyDown: this.handleKeyDown,
            handleKeyUp: this.handleKeyUp
        };
    }

    public componentDidMount() {
        document && document.addEventListener('keydown', this.globalHotkeysEvents.handleKeyDown);
        document && document.addEventListener('keyup', this.globalHotkeysEvents.handleKeyUp);
    }

    public componentWillMount() {
        document && document.removeEventListener('keydown', this.globalHotkeysEvents.handleKeyDown);
        document && document.removeEventListener('keyup', this.globalHotkeysEvents.handleKeyUp);
    }


    private handleKeyDown = (e: KeyboardEvent) => {
        return;
    }

    private handleKeyUp = (e: KeyboardEvent) => {
        hotkeyList.map(hotkey => {
            if (e.key === hotkey.key) {
                if (this.isTextInput(e)) {
                    noop();
                } else {
                    if (hotkey.onKeyUp) this[hotkey.onKeyUp]();
                }
            }
        });
    }

    private isTextInput(e: KeyboardEvent) {
        const elem = e.target as HTMLElement;
        if (elem == null || elem.closest == null) {
            return false;
        }
        const editable = elem.closest('input, textarea, [contenteditable=true]');

        if (editable == null) {
            return false;
        }

        if (editable.tagName.toLowerCase() === 'input') {
            const inputType = (editable as HTMLInputElement).type;
            if (inputType === 'checkbox' || inputType === 'radio') {
                return false;
            }
        }

        if ((editable as HTMLInputElement).readOnly) {
            return false;
        }

        return true;
    }

    private getFirstPokemonId () {
        return this.props.pokemon.sort(sortPokes)[0].id;
    }

    private getLastPokemonId () {
        return this.props.pokemon.sort(sortPokesReverse)[0].id;
    }

    private previousPokemon () {
        const poke = this.props.pokemon.find(p => p.id === this.props.selectedId);
        const position = poke!.position;
        const prevPoke = this.props.pokemon.find(p => p.position === position! - 1);
        const id = prevPoke ? prevPoke.id : this.getLastPokemonId();
        this.props.selectPokemon(id);
        console.log('j', poke, position, prevPoke, id);
    }

    private nextPokemon () {
        const poke = this.props.pokemon.find(p => p.id === this.props.selectedId);
        const position = poke!.position;
        const nextPoke = this.props.pokemon.find(p => p.position === position! + 1);
        const id = nextPoke ? nextPoke.id : this.getFirstPokemonId();
        this.props.selectPokemon(id);
        console.log('k', poke, position, nextPoke, id);
    }

    private deletePokemon () {
        this.props.deletePokemon(this.props.selectedId);
    }

    public render() {
        return <div />;
    }
}

export const Hotkeys = connect(
    (state: Partial<typeof reducers>) => ({
        pokemon: state.pokemon,
        selectedId: state.selectedId
    }),
    {
        selectPokemon,
        deletePokemon,
    }
)(HotkeysBase as any);