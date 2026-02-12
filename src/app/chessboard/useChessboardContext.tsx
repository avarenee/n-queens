import React from 'react';
import { ChessboardContext } from '@/contexts/chessboard.context';

const useChessboardContext = () => {
    const context = React.useContext(ChessboardContext);
    if (!context) {
        throw new Error('ChessboardContext must be used within a ChessboardContext');
    }
    return context;
};

export default useChessboardContext;