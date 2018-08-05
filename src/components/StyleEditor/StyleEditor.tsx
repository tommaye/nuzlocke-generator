import * as React from 'react';
import { connect } from 'react-redux';

import { editStyle } from 'actions';
import { gameOfOriginToColor, styleDefaults, listOfThemes, FEATURES } from 'utils';
import {
    RadioGroup,
    Radio,
    TextArea,
    Checkbox,
    Button,
    Intent,
} from '@blueprintjs/core';
import { BaseEditor } from 'components/BaseEditor';
import { cx } from 'emotion';

import * as Styles from './styles';

const editEvent = (e, props: StyleEditorProps, name?, game?) => {
    const propName = name || e.target.name;
    props.editStyle({ [propName]: e.target.value });
    if (propName === 'template' && e.target.value === 'Default Light') {
        props.editStyle({ bgColor: '#eeeeee' });
        props.editStyle({ topHeaderColor: '#dedede' });
    }
    if (propName === 'template' && e.target.value === 'Default Dark') {
        props.editStyle({ bgColor: '#383840' });
        props.editStyle({ topHeaderColor: '#333333' });
    }
    if (propName === 'template' && e.target.value === 'Cards') {
        props.editStyle({ imageStyle: 'square' });
    }
    if (propName === 'template' && e.target.value === 'Generations') {
        props.editStyle({
            bgColor: gameOfOriginToColor(game),
        });
        props.editStyle({
            resultHeight: 870
        });
        props.editStyle({
            resultWidth: 1460
        });
    }
};

export interface StyleEditorProps {
    style: any;
    editStyle: editStyle;
    game: any;
}

export const ColorEdit = ({ value, onChange, name }) => {
    return (
        <div className={cx(Styles.colorEditWrapper)}>
            <input
                name={name}
                onChange={onChange}
                className={cx(Styles.colorInput)}
                type='color'
                value={value}
            />
            <input
                style={{ border: 'none' }}
                onChange={onChange}
                type='text'
                className='color-text-input'
                name={name}
                value={value}
            />
        </div>
    );
};

export const IconsNextToTeamPokemon = (props) => (
    <div className='style-edit'>
        <Checkbox
            checked={props.style.iconsNextToTeamPokemon}
            name='iconsNextToTeamPokemon'
            label='Icons Next to Team Pokemon'
            onChange={(e:any) => editEvent({ ...e, target: { value: e.target.checked }}, props, 'iconsNextToTeamPokemon')}
        />
    </div>
);

export const StyleEditorBase = (props: StyleEditorProps) => {
    const getStyleProp = (prop: string) => {
        if (props && props.style && props.style[prop]) props.style[prop];
        else return styleDefaults[prop];
    };
    return (
        <BaseEditor name='Style'>
            <div className={cx(Styles.styleEdit)}>
                <label className='pt-label pt-inline'>Template</label>
                <div className='pt-select'>
                    <select
                        name='template'
                        onChange={e => editEvent(e, props, null, props.game.name)}
                        value={props.style.template}>
                        {listOfThemes.map(o => <option key={o}>{o}</option>)}
                    </select>
                </div>
                {
                    FEATURES.themeEditing ?
                    <Button
                        style={{ marginLeft: '.25rem' }}
                        intent={Intent.PRIMARY}
                        className='pt-minimal'
                    >Edit Theme</Button>
                    : null
                }
            </div>

            {
                props.style.template === 'Hexagons' ?
                <div className={cx(Styles.styleEdit)}>
                    <h6>Hexagons Template Options</h6>
                </div>
                : null
            }

            <div className={cx(Styles.styleEdit)}>
                <RadioGroup
                    className={cx(Styles.radioGroup)}
                    label='Image Style'
                    onChange={e => editEvent(e, props, 'imageStyle')}
                    selectedValue={props.style.imageStyle}>
                    <Radio label='Round' value='round' />
                    <Radio label='Square' value='square' />
                </RadioGroup>
            </div>

            <div className={cx(Styles.styleEdit)}>
                <RadioGroup
                    className={cx(Styles.radioGroup)}
                    label='Item Style'
                    onChange={e => editEvent(e, props, 'itemStyle')}
                    selectedValue={props.style.itemStyle}>
                    <Radio label='Round' value='round' />
                    <Radio label='Square' value='square' />
                </RadioGroup>
            </div>

            <div className={cx(Styles.styleEdit)}>
                <label className='pt-label pt-inline'>Result Dimensions</label>
                <input
                    name='resultWidth'
                    className='pt-input small-input'
                    onChange={e => editEvent(e, props)}
                    value={props.style.resultWidth}
                    type='number'
                    min='0'
                    step='10'
                />
                <span style={{ marginRight: '0' }} className='pt-icon pt-icon-cross' />
                <input
                    name='resultHeight'
                    className='pt-input small-input'
                    onChange={e => editEvent(e, props)}
                    value={props.style.resultHeight}
                    type='number'
                    min='0'
                    step='10'
                />
            </div>
            <div className={cx(Styles.styleEdit)}>
                <label className='pt-label pt-inline'>Background color</label>
                <ColorEdit
                    onChange={e => editEvent(e, props)}
                    name={'bgColor'}
                    value={props.style.bgColor}
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <label className='pt-label pt-inline'>Header color</label>
                <ColorEdit
                    name='topHeaderColor'
                    onChange={e => editEvent(e, props)}
                    value={props.style.topHeaderColor}
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <label className='pt-label pt-inline'>Background Image</label>
                <input
                    value={props.style.backgroundImage}
                    name='backgroundImage'
                    onChange={e => editEvent(e, props)}
                    className='pt-input'
                />
                <span>{' '}</span>
                <Checkbox
                    style={{
                        marginBottom: '0',
                        marginLeft: '10px',
                    }}
                    checked={props.style.tileBackground}
                    name='tileBackground'
                    label='Tile'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'tileBackground',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <RadioGroup
                    className={cx(Styles.radioGroup)}
                    label='Moves Position'
                    onChange={e => editEvent(e, props, 'movesPosition')}
                    selectedValue={props.style.movesPosition}>
                    <Radio label='Horizontal' value='horizontal' />
                    <Radio label='Vertical' value='vertical' />
                </RadioGroup>
            </div>

            <div className={cx(Styles.styleEdit)}>
                <RadioGroup
                    className={cx(Styles.radioGroup)}
                    label='Team Images'
                    onChange={e => editEvent(e, props, 'teamImages')}
                    selectedValue={props.style.teamImages}>
                    <Radio label='Standard' value='standard' />
                    <Radio label='Sugimori' value='sugimori' />
                </RadioGroup>
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.teamPokemonBorder}
                    name='teamPokemonBorder'
                    label='Team Pokemon Gradient Backgrounds'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'teamPokemonBorder',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.showPokemonMoves}
                    name='showPokemonMoves'
                    label='Show Pokemon Moves'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'showPokemonMoves',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.minimalTeamLayout}
                    name='minimalTeamLayout'
                    label='Minimal Team Layout'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'minimalTeamLayout',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.displayBadges}
                    name='displayBadges'
                    label='Display Badges'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'displayBadges',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.displayRules}
                    name='displayRules'
                    label='Display Nuzlocke Rules'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'displayRules',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.oldMetLocationFormat}
                    name='oldMetLocationFormat'
                    label='Old Met Location Format'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'oldMetLocationFormat',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.grayScaleDeadPokemon}
                    name='grayScaleDeadPokemon'
                    label='Gray Scale Filter Dead Pokemon Images'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'grayScaleDeadPokemon',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.spritesMode}
                    name='spritesMode'
                    label='Sprites Mode'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'spritesMode',
                        )
                    }
                />
            </div>

            <div className={cx(Styles.styleEdit)}>
                <Checkbox
                    checked={props.style.scaleSprites}
                    name='scaleSprites'
                    label='Scale Sprites'
                    onChange={(e: any) =>
                        editEvent(
                            { ...e, target: { value: e.target.checked } },
                            props,
                            'scaleSprites',
                        )
                    }
                />
            </div>

            <div className='custom-css-input-wrapper'>
                <label style={{ padding: '.5rem' }} className='pt-label'>
                    Custom CSS {/*<a href=''>Check out Layout Guide</a>*/}
                </label>
                <TextArea
                    large={true}
                    onChange={e => editEvent(e, props, 'customCSS')}
                    className='custom-css-input pt-fill'
                    value={props.style.customCSS}
                />
                <style>{props.style.customCSS}</style>
            </div>
        </BaseEditor>
    );
};

export const StyleEditor = connect((state: any) => ({ style: state.style, game: state.game }), {
    editStyle,
})(StyleEditorBase);
