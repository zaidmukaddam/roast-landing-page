import { Box, Image, Stack, Text, ListItem, OrderedList } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import LoadingText from "./LoadingText";

type RoastOutputProps = {
  image: File | null;
  roast: string | null;
  loading: boolean;
};

const DefaultImage = "/landing-page.png";
const DefaultDescription = "Landing page about to be roasted";

interface RoastResponse {
  score?: string;
  oneLine?: string;
  roast?: string;
  pointers?: string;
}

const RoastOutput = ({ image, roast, loading }: RoastOutputProps) => {

  const newTheme = {
    ol: (props: any) => {
      const { children } = props;
      return (
        <OrderedList pl={4} fontSize='lg'>
          {children}
        </OrderedList>
      );
    }
  }

  const parsedRoast = roast?.split('\n').reduce((acc: RoastResponse, curr, index, array) => {
    // Match only lines that contain the ':' separator and are followed by a key
    if (curr.includes(':') && (array.length > index + 1 && array[index + 1].includes(':'))) {
      const [key, value] = curr.split(':').map((el) => el.trim());
      if (key) {
        acc[key as keyof RoastResponse] = value;
      }
    } else if (curr.includes(':')) {
      // Handle the case where the ':' separator is present but the value spans multiple lines
      const [key, ...value] = curr.split(':');
      if (key) {
        acc[key as keyof RoastResponse] = value.join(':').trim() + '\n';
      }
    } else {
      // Continue adding values to the last key found
      const lastKey = Object.keys(acc).pop();
      if (lastKey) {
        acc[lastKey as keyof RoastResponse] += curr + '\n';
      }
    }
    return acc;
  }, {});

  return (
    <Stack
      w={{
        base: "full",
        md: "60%",
      }}
      direction={{ base: "column", md: "row" }}
      px={{ base: 8, md: 0 }}
      pb={{ base: 25, md: 20 }}
    >
      <Image
        src={image ? URL.createObjectURL(image) : DefaultImage}
        alt={image ? image.name : DefaultDescription}
        objectFit="cover"
        rounded="md"
        h={{ base: "full", md: "full" }}
        w={{ base: "full", md: "25rem" }}
      />
      <Box
        bg="green.700"
        p={4}
        rounded="md"
        h="full"
        w={{ base: "full", md: "30rem" }}
      >
        <Box color="whiteAlpha.900" mt={5}>
          {roast && parsedRoast?.oneLine && (
            <>
              <Text fontSize="5xl" fontWeight="bold" mb={1}>
                {parsedRoast?.score}/10
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mb={1}>
                {parsedRoast?.oneLine}
              </Text>
              <Text fontSize="lg" fontWeight="bold" mb={3}>
                {parsedRoast?.roast}
              </Text>
              {parsedRoast.pointers && (<Text fontSize="lg" fontWeight="bold" mb={3}>
                Roasted Pointers:
              </Text>)}
              <ReactMarkdown children={parsedRoast.pointers ?? ''} components={ChakraUIRenderer(newTheme)} />
            </>
          )}

          {loading && <LoadingText />}

          {!roast && !loading && (
            <div>
              <Text fontSize="5xl" fontWeight="bold" mb={1}>
                6/10
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mb={1}>
                It's as if Helvetica had a baby with a spreadsheet and called it "design."
              </Text>
              <Text fontSize="lg" fontWeight="bold" mb={3}>
                I've had more exciting experiences watching paint dry. With all the white space, it's a miracle the text doesn't get lonely. How about we add some visuals that actually celebrate the 'unlocking insights from images' instead of just saying it?
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                Roasted Pointers:
              </Text>
              <OrderedList pt={5} pl={4} fontSize='md' >
                <ListItem>The color palette is like a diet of water and rice cakes – technically functional but desperately crying out for some flavor.</ListItem>
                <ListItem>That chat interface seems to have taken minimalist inspiration from a ghost town – are tumbleweeds included with every chat?</ListItem>
                <ListItem>The value proposition could use a dash of excitement; it reads like the side effects section of a medication pamphlet.</ListItem>
                <ListItem>The feature icons are about as engaging as a dial tone – they could use a visual pick-me-up to build a connection.</ListItem>
                <ListItem>The “Made for you” section suddenly makes me miss those targeted ads that think I'm interested in Alpaca farming. Can we get some personal touch here?</ListItem>
              </OrderedList>
            </div>
          )}
        </Box>
      </Box>
    </Stack>
  );
};
export default RoastOutput;
