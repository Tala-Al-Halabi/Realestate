import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Loader } from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import PropertyFilters from './PropertyFilters';
import PropertyList from './PropertyList';
import PropertyListItemPlaceholder from './PropertyListItemPlaceholder';

export default observer(function PropertyDashboard() {
    const { propertyStore } = useStore();
    const { loadProperties, propertyRegistry, setPagingParams, pagination } = propertyStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadProperties().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (propertyRegistry.size <= 1) loadProperties();
    }, [propertyRegistry.size, loadProperties])

    return (
        <Grid>
            <Grid.Column width='10'>
                {propertyStore.loadingInitial && !loadingNext ? (
                    <>
                        <PropertyListItemPlaceholder />
                        <PropertyListItemPlaceholder />
                    </>
                ) : (
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                            initialLoad={false}
                        >
                            <PropertyList />
                        </InfiniteScroll>
                    )}
            </Grid.Column>
            <Grid.Column width='6'>
                <PropertyFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})