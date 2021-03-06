import * as React from 'react';
import { Alert, Intent } from '@blueprintjs/core';

import { deletePokemon, modifyDeletionConfirmation } from 'actions';
import { connect } from 'react-redux';

// const recomposeDelete = withState('dialogOn', 'setDialog', false);

interface DeletePokemonButtonProps {
    id: string;
    confirmation?: boolean;
    modifyDeletionConfirmation?: modifyDeletionConfirmation;
    deletePokemon?: deletePokemon;
}

export class DeletePokemonButtonBase extends React.Component<
    DeletePokemonButtonProps,
    { dialogOn: boolean }
> {
    constructor(props: DeletePokemonButtonProps) {
        super(props);
        this.state = {
            dialogOn: false,
        };
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    private toggleDialog() {
        this.setState({
            dialogOn: !this.state.dialogOn,
        });
    }

    public render() {
        return (
            <div className='delete-pokemon-button'>
                <Alert
                    icon='trash'
                    isOpen={this.state.dialogOn && this.props.confirmation as boolean}
                    onCancel={this.toggleDialog}
                    onConfirm={e => this.props.deletePokemon && this.props.deletePokemon(this.props.id)}
                    confirmButtonText='Delete Pokemon'
                    cancelButtonText='Cancel'
                    intent={Intent.DANGER}>
                    <p>
                        This will delete the currently selected Pokemon. Are you sure you want to do
                        that?
                    </p>

                    <label className='pt-control pt-checkbox .modifier'>
                        <input onChange={(event) => this.props.modifyDeletionConfirmation && this.props.modifyDeletionConfirmation(!event.target.checked)} type='checkbox' />
                        <span className='pt-control-indicator' />
                        Don't Ask Me For Confirmation Again
                    </label>
                </Alert>
                <span
                    role='button'
                    onClick={e => {
                        if (this.props.confirmation) {
                            this.toggleDialog();
                        } else {
                            this.props.deletePokemon && this.props.deletePokemon(this.props.id);
                        }
                    }}
                    className='pt-icon pt-icon-trash'
                    title='Delete Pokemon'
                />
            </div>
        );
    }
}

export const DeletePokemonButton: any = connect(
    (state: any) => ({
        confirmation: state.confirmation,
    }),
    {
        deletePokemon
    }
)(DeletePokemonButtonBase as any);