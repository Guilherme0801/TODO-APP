import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => (
        <div role='form' className="todoForm" style={{display:'flex',justifyContent:'space-between'}}>
            <Grid cols='12 9 10'>
                <input id="description" className='form-control' 
                    placeholder='Adicione uma Tarefa'
                    onChange={props.handleChange}
                    value={props.description} 
                    style={{display:"flex",width:'80vw'}}></input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus' onClick={props.handleAdd}/>
                <IconButton style='info' icon='search' onClick={props.handleSearch}/>
            </Grid>
        </div>
)