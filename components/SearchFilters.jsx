import { Flex, Select, Box, text, Input, Spinner, Icon, Buttons } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';
import { useState } from 'react';
import { getFilterValues, filterData } from '../utils/filterData'

const SearchFilters = () => {
    const [filters] = useState(filterData);
    const router = useRouter();

    const searchProperties = (filterValues) => {
        const path = router.pathname;
        const {query} = router;

        const values = getFilterValues(filterValues);

        values.forEach((item) => {
            query[item.name] = item.value
        })

        router.push({pathname: path, query})
     }

    return (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select 
                        placeholder={filter.placeholder}
                        w="fit-content"
                        p="2"
                        borderColor="gray.400"
                        onChange={(e) => searchProperties({[filter.queryName] : e.target.value})}
                    >
                        {filter?.items?.map((items) => (
                            <option value={items.value} key={items.value}>
                                {items.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            ))}
        </Flex>
    )
}
 export default SearchFilters;