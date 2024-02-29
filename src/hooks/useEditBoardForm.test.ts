import { renderHook, act } from "@testing-library/react";
import { useEditBoardForm } from './useEditBoardForm'; // Adjust the import path as necessary

describe('useEditBoardForm', () => {
    it('initializes board name and columns correctly', () => {
        const { result } = renderHook(() => useEditBoardForm());
    
        expect(result.current.boardName.value).toBe("");
        expect(result.current.columns).toEqual([]);
    });
  
    it('updates board name', () => {
        const { result } = renderHook(() => useEditBoardForm());
    
        act(() => {
            result.current.boardNameChange({ id: '1', value: 'New Board Name', valid: true });
        });
    
        expect(result.current.boardName.value).toBe('New Board Name');
        expect(result.current.boardName.valid).toBe(true);
    });
  
    it('adds a column', () => {
        const { result } = renderHook(() => useEditBoardForm());
    
        act(() => {
            result.current.addColumn();
        });
    
        expect(result.current.columns.length).toBe(1);
        expect(result.current.columns[0].valid).toBe(false); // Initially, the column is not valid
    });
  
    it('updates a column by id', () => {
        const { result } = renderHook(() => useEditBoardForm());
    
        // First, add a column
        act(() => {
            result.current.addColumn();
        });
    
        const columnId = result.current.columns[0].id;
    
        // Now, update the added column
        act(() => {
            result.current.updateColumnById({ id: columnId, value: 'Updated Column', valid: true });
        });
    
        expect(result.current.columns[0].value).toBe('Updated Column');
        expect(result.current.columns[0].valid).toBe(true);
    });
  
    it('deletes a column by id', () => {
        const { result } = renderHook(() => useEditBoardForm());
    
        // Add two columns
        act(() => {
            result.current.addColumn();
            result.current.addColumn();
        });
    
        const columnIdToDelete = result.current.columns[0].id;
    
        // Delete the first column
        act(() => {
            result.current.deleteColumnById(columnIdToDelete);
        });
    
        expect(result.current.columns.length).toBe(1); // Only one column should remain
    });
  
    it('validates columns', () => {
        const { result } = renderHook(() => useEditBoardForm());

        // Add a valid column
        act(() => {
            result.current.addColumn();
        });
        act(() => {
            result.current.updateColumnById({ id: result.current.columns[0].id, value: 'Column', valid: true });
        })
    
        // Validate columns
        const isValid = result.current.validateColumns();
    
        expect(isValid).toBe(true);

        //validte not empty
        act(() => {
            result.current.updateColumnById({ id: result.current.columns[0].id, value: '', valid: false });
        })

        const isValid2 = result.current.validateColumns();
    
        expect(isValid2).toBe(false);
    });

    it('validates column', () => {
        const { result } = renderHook(() => useEditBoardForm());

        // Add a valid column
        act(() => {
            result.current.addColumn();
            result.current.addColumn();
        });

        act(() => {
            result.current.updateColumnById({ id: result.current.columns[0].id, value: '', valid: false });
        })
    
        // Validate column not empty
        const errMsg1 = result.current.validateColumn(result.current.columns[0].value);
    
        expect(errMsg1 !== "").toBe(true);

        // Validate column not repeated
        act(() => {
            result.current.updateColumnById({ id: result.current.columns[0].id, value: 'demo', valid: false });
        })

        act(() => {
            result.current.updateColumnById({ id: result.current.columns[1].id, value: 'demo', valid: false });
        })

        const errMsg2 = result.current.validateColumn(result.current.columns[0].value, result.current.columns[0].id);
        const errMsg3 = result.current.validateColumn(result.current.columns[1].value, result.current.columns[1].id);
        
        expect(errMsg2 == errMsg3).toBe(true);

        //right value check
        act(() => {
            result.current.updateColumnById({ id: result.current.columns[1].id, value: 'demo2', valid: false });
        })
        const errMsg4 = result.current.validateColumn(result.current.columns[1].value, result.current.columns[1].id);
        expect(errMsg4 === "").toBe(true);
    });
  
    it('reset EditTaskForm', () => {
        const { result } = renderHook(() => useEditBoardForm());
    
        // Set a new status ID
        act(() => {
            result.current.resetEditBoardForm();
        });
        
        expect(result.current.boardName.value).toBe('');
        expect(result.current.columns.length).toBe(0);

    });

    it('init boardName', () => {
        const { result } = renderHook(() => useEditBoardForm());

        act(() => {
            result.current.initBoardName("boardName");
        });

        expect(result.current.boardName.value).toBe("boardName");
        expect(result.current.boardName.valid).toBe(true);

    })

    it('init columns', () => {
        const { result } = renderHook(() => useEditBoardForm());
        const statusList = [
            {id: "1", value: "column1"},
            {id: "2", value: "column2"}
        ]

        act(() => {
            result.current.initColumns(statusList);
        });

        result.current.columns.map((item, i) => {
            expect(item.value).toBe(statusList[i].value);
            expect(item.valid).toBe(true);
        })

    })
});
