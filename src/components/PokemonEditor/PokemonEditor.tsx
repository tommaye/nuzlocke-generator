import { Button } from '@blueprintjs/core';
import * as React from 'react';
import { connect } from 'react-redux';

import { Pokemon } from 'models';
import { Boxes } from 'types';

import {
    generateEmptyPokemon,
} from 'utils';
import { CurrentPokemonEdit, MassEditor } from '.';

import { AddPokemonButton } from 'components/AddPokemonButton';
import { BaseEditor } from 'components/BaseEditor';
import { PokemonByFilter } from 'components/Shared';

require('../../assets/img/team-box.png');
require('../../assets/img/dead-box.png');

export const Box = ({
    pokemon,
    tabTitle,
    boxId,
    filterString,
}: {
    pokemon;
    tabTitle;
    boxId;
    filterString?;
}) => {
    const filter = filterString === 'All' ? null : filterString;
    return (
        <div className={`box ${tabTitle}-box`}>
            {/* <LinkedTabTitle boxId={boxId} title={tabTitle} /> */}
            <span style={{
                background: '#222',
                borderRadius: '.25rem',
                color: '#eee',
                display: 'inline-block',
                margin: '.25rem',
                padding: '.25rem',
                textAlign: 'center',
                width: '4rem',
            }}>
                {tabTitle}
            </span>
            {PokemonByFilter(pokemon, filter)}
        </div>
    );
};

export interface PokemonEditorProps {
    team: Pokemon[];
    boxes: Boxes;
}

export interface PokemonEditorState {
    isMassEditorOpen: boolean;
    isOpen: boolean;
}

export class PokemonEditorBase extends React.Component<PokemonEditorProps, PokemonEditorState> {
    constructor(props: PokemonEditorProps) {
        super(props);
        this.state = {
            isMassEditorOpen: false,
            isOpen: true,
        };
    }

    private boxes: HTMLDivElement | null;

    public componentDidMount() {}

    private openMassEditor = e => {
        this.setState({
            isMassEditorOpen: true,
        });
    };

    private toggleEditor = e => this.setState({ isOpen: !this.state.isOpen });

    private renderBoxes(boxes, team) {
        return boxes.map(({ key, name }) => {
            return <Box key={key} pokemon={team} tabTitle={name} boxId={key} filterString={name} />;
        });
    }

    public render() {
        const { team, boxes } = this.props;
        const { isOpen } = this.state;

        return (
            <>
                <BaseEditor name='Pokemon'>
                    <div className='button-row' style={{ display: 'flex' }}>
                        <AddPokemonButton defaultPokemon={generateEmptyPokemon(team)} />
                        <Button
                            icon={'heat-grid'}
                            onClick={this.openMassEditor}
                            style={{ marginLeft: 'auto' }}
                            className='pt-intent-primary pt-minimal'>
                            Open Mass Editor
                        </Button>
                    </div>
                    <br />
                    {this.renderBoxes(boxes, team)}
                    <br />
                    <CurrentPokemonEdit />
                </BaseEditor>
                <MassEditor
                    // @ts-ignore
                    isOpen={this.state.isMassEditorOpen}
                    toggleDialog={e =>
                        this.setState({ isMassEditorOpen: !this.state.isMassEditorOpen })
                    }
                />
            </>
        );
    }
}

export const PokemonEditor = connect(
    (state: any) => ({
        team: state.pokemon,
        boxes: state.box,
    }),
    null,
)(PokemonEditorBase);
