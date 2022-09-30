import React from 'react'
import fetch from 'cross-fetch'
import {List, ListItem} from '@chakra-ui/react'
import Link from '../../components/link'

const ContentSearch = ({contentResult}) => {

    ContentSearch.getProps = async () => {
        let contentResult
        //Make a call to the URL substituting Key Values from table
        const res = await fetch(
            `${getAppOrigin()}/mobify/proxy/ocapi/s/pwa-training/dw/shop/v20_2/content_search?q=about&client_id=c1c2266d-77ec-43b4-9cdc-a8e52d636b7b`
        )
        if (res.ok) {
            contentResult = await res.json()
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log(contentResult)
        }
        return {contentResult}
    }

    if (!contentResult) {
        return <div>Loading...</div>
    }

    const {hits = []} = contentResult
    return (
        <div>
            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <Link key={id} to={`/content/${id}`}>
                            <ListItem>{name}</ListItem>
                        </Link>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch