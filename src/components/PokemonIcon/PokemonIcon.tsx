import * as React from 'react';
import { connect } from 'react-redux';
import { getSpriteIcon, speciesToNumber, StoreContext, listOfPokemon } from '../../utils';
import { pokemon } from 'reducers/pokemon';
import { selectPokemon } from 'actions';
import { ErrorBoundary } from '../Shared';

interface PokemonIconProps {
    /** The id of the Pokemon, used for selection **/
    id?: string;
    /** The id of the Pokemon **/
    species: string;
    /** The forme of the Pokemon **/
    forme?: string;
    onClick: () => void;
    selectedId: string | null;
    /** Renders its shiny version if true **/
    isShiny?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const formatSpeciesName = (species: string | null) => {
    if (species == null) return 'unknown';
    if (listOfPokemon.indexOf(species) < 0) return 'unknown';
    if (species === 'Nidoran♀') return 'nidoran-f';
    if (species === 'Nidoran♂') return 'nidoran-m';
    if (species === 'Mr. Mime') return 'mr-mime';
    if (species === 'Farfetch\'d') return 'farfetchd';
    if (species === 'Mime Jr.') return 'mime-jr';
    if (species === 'Flabébé') return 'flabebe';
    return species.toLowerCase();
};

const getForme = (forme) => {
    return '';
};

export class PokemonIconBase extends React.Component<PokemonIconProps> {
    public iconRef: React.RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.iconRef = React.createRef();
    }

    public componentDidUpdate() {
        const node = this.iconRef.current;
    }

    public render() {
        const { id, species, forme, onClick, selectedId, className, isShiny, style } = this.props;
        return (
            <ErrorBoundary>
                <div
                    role='icon'
                    onClick={e => {
                        e.preventDefault();
                        onClick && onClick();
                    }}
                    ref={this.iconRef}
                    id={id}
                    style={style}
                    className={
                        `${id === selectedId ? 'pokemon-icon selected' : 'pokemon-icon'}${className || ''}`
                    }>
                    <img
                      alt={species}
                      src={`icons/pokemon/${isShiny ? 'shiny' : 'regular'}/${formatSpeciesName(species)}.png`}
                    />
                </div>
            </ErrorBoundary>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(selectPokemon(ownProps.id));
        },
    };
};


export const PokemonIcon = connect(
    (state: any) => ({ selectedId: state.selectedId }),
    mapDispatchToProps
)(
    PokemonIconBase,
);
