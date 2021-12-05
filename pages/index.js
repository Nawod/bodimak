import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchAPI';
import Property from '../components/Property'



const Banner = ({purpose,imageUrl, title1, title2, desc1, desc2, linkName, buttonText}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10" bg="gray.100" p="5" borderRadius="10" boxShadow="md">
      <style jsx global>{`.image-wrapper { border-radius: 8px;}`}</style>
      <Image className="image-wrapper" src={imageUrl} width={400} height={250} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text  fontSize="3xl" fontWeight="bold">{title1}<br />{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1}<br />{desc2}</Text>
      <Button fontSize="xl" colorScheme='blue' bg="blue.400">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({propertiesForSale, propertiesForRent}) {
  
  return (
    <Box>
      <Banner 
        purpose="RENT A BOARDING"
        title1="Rental Boarding for"
        title2="Everyone"
        desc1="Explore Appartments, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose-for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>

      <Banner 
        purpose="BUY A HOUSE"
        title1="Find and Buy a"
        title2="House"
        desc1="Explore Appartments, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose-for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap='wrap' alignItems="center" justifyContent="center">
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

// export default Home;