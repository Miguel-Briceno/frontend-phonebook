
const Filter = ({search, handle, personToShow})=>{
    
    return(
        <div>
            <div>
                filter shown with:{' '}
                <input
                    onChange={handle}
                    value={search}
                />
            </div>
            <div>
                {personToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
            </div>
        </div>
    )
    
    
}







export default Filter