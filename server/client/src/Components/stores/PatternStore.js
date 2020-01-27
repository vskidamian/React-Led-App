import React from 'react';

const PatternContext = React.createContext({})

export default class PatternStore extends React.Component {

    state = {
        currentActivePattern: null
    }

    changeCurrentActivePattern = currentActivePattern => {
        this.setState({ currentActivePattern })
    }

    render() {

        return (
            <PatternContext.Provider value={{
                currentActivePattern: this.state.currentActivePattern,
                changeCurrentActivePattern: this.changeCurrentActivePattern
            }}>
                {this.props.children}
            </PatternContext.Provider>
        )

    }

}

export const usePatternStore = () => {
    return React.useContext(PatternContext)
}





