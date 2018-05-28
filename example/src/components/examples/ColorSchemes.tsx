import * as React from 'react';

interface IColorSchemesProps {
    color?: string
    onChange: (color: string) => void
}

interface IColorSchemesState {
    color?: string
}

class ColorSchemes extends React.Component<IColorSchemesProps, IColorSchemesState> {

    public static defaultProps = {
        color: '',
    };

    constructor(props: IColorSchemesProps) {
        super(props);
        this.state = {
            color: props.color,
        };
    }

    public componentWillReceiveProps(nextProps: IColorSchemesProps) {
        this.setState({color: nextProps.color});
    }

    public handleColor(color: string) {
        this.setState({color});
        if (this.props.onChange) {
            this.props.onChange(color);
        }
    }

    public render() {
        const colors = 'Black Red Green Blue Aero Grey Orange Yellow Pink Purple'.split(' ');

        const lis = colors.map(color => {
            let newColor = color.toLowerCase();
            if (newColor === 'black') {
                newColor = '';
            }
            return (
                <li
                    key={newColor}
                    className={newColor + (this.state.color === newColor ? ' active' : '')}
                    title={color}
                    onClick={this.handleColor.bind(this, newColor)}
                />
            );
        });

        return (
            <div className="colors clear">
                <strong>Color schemes</strong>
                <ul>
                    {lis}
                </ul>
            </div>
        );
    }
}

export default ColorSchemes;
