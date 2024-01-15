import {
  Box,
  Breadcrumbs,
  Button,
  colors,
  Container,
  Divider,
  Grid,
  Typography,
  Link,
  useMediaQuery,
} from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import AuthWebClient from "../../../core/axios/auth-web-client";
import { formatCurrency } from "../../../core/utils/formatter";
import { displayRazorpay } from "../../../core/utils/razorpay";
import { AuthContext } from "../../../store/auth";

const courses = [
  {
    src: "https://aws-s3-images.sertnation.com/thumbnails/affiliate-course.png",
    title: "Affiliate Marketing",
    desc: "It's rightfully said, \"sales is everywhere\". In this course, you'll learn A-Z about affiliate marketing and lead conversion. Raunaq Singh, the instructor, will share his knowledge on Affiliate Marketing. He has been a part of many big firms and their training programs. He has trained people about converting leads, understanding customers. In his course, you're going to learn everything about Affiliate marketing, from generating leads to converting them into sales.",
    chapters: 4,
    hours: 2.5,
    person: "Raunaq Singh",
    attr: "Sales Expert",
    modules: [
      {
        title: "Chapter 1: Introduction to Affiliate Marketing",
        desc: [
          "What is Affiliate marketing and its types",
          "Difference between Affiliate and network marketing",
          "The difference in the commission rates",
          "Identifying scams in the market",
          "Pros and cons",
        ],
      },
      {
        title: "Chaper 2: Choosing your product",
        desc: [
          "Various commissions and products in Affiliate marketing",
          "Choosing your product and platform on basis of-",
          "1) commissions",
          "2) product value",
          "3) audience",
          "4) potential to sell",
          "High tickets v/s low tickets",
          "Audience size in high and low tickets",
          "How to check the authenticity of the product",
        ],
      },
      {
        title: "Chapter 3: Lead generation",
        desc: [
          "Various platforms to sell",
          "Expanding traffic on social media platforms",
          "What are 3 concentric circles",
          "Inorganic v/s Organic leads ",
          "Pros and cons of the two methods",
        ],
      },
      {
        title: "Chapter 4: Converting leads to sale",
        desc: [
          "How to introduce yourself?",
          "What is rapport building?",
          "How to generate need?",
          "What is need mapping?",
          "How to pitch your product?",
          "What is the best time to do sale closure?",
        ],
      },
    ],
  },
  {
    src: "https://aws-s3-images.sertnation.com/thumbnails/fashion-course.png",
    title: "Fashion & Styling",
    desc: "Fashion helps you in every sector of life, private life, work-life. More than self-expression, fashion is a mean of self-empowerment and confidence. Fashion allows you to express your individuality, can make you feel more confident, and can change your life and interactions with people based on them perceiving you a certain way by the clothing you chose to wear. In this course, you'll learn about outfit ideas, mistakes to avoid, all about suits and much more! This course is presented by Raunaq Singh, for him, fashion helped him a lot in his public and work life. He tells it gave him confidence, helped him express his personality and his sense of aesthetics. \"People think fashion is something luxuries and only for a certain section of society. You don't realize the importance of fashion until you've been made quick, snap judgments by perceptions from people\", Raunaq says.",
    chapters: 6,
    hours: 2.5,
    person: "Raunaq Singh",
    attr: "Sales Expert",
    modules: [
      {
        title: "Chapter 1: Introduction to Fashion and Body Styling",
        desc: [
          "Fashion and its importance",
          "Why should I learn about fashion?",
          "Body types and fashion",
          "Do's and dont's",
        ],
      },
      {
        title: "Chapter 2: Fashion & Body Type",
        desc: [
          "Body types and fashion",
          "Learn about-",
          "i) The inverted triangle",
          "ii) The rectangle",
          "iii) The oval",
          "iv) The triangle",
        ],
      },
      {
        title: "Chapter 3: Street Fashion",
        desc: [
          "Types of street fashion",
          "Hip Hop fashion and its rules",
          "Influence by hip hop artist",
          "What is hype fashion?",
          "How do companies market under hype fashion?",
          "What are resellers and how to buy?",
        ],
      },
      {
        title: "Chapter 4: Hip Hop Fashion",
        desc: [
          "Influence by hip hop artist",
          "How does sport play a part in hip-hop fashion?",
          "How to dress up in this fashion?",
        ],
      },
      {
        title: "Chapter 5: Casual Wear",
        desc: [
          "How is casual fashion evergreen?",
          "What are some wardrobe essentials?",
          "How to dress for college?",
          "What are some tips for beachwear?",
          "Some outfit ideas for parties and occasions",
          "Fashion mistakes to avoid ",
        ],
      },
      {
        title: "Chapter 6: Occasional Wear",
        desc: [
          "Ethnic traditional and pairing",
          "History of suits",
          "Types of suits and variation with countries",
          "What are suit patters?",
          "What type of lapels you should select?",
          "Types of jackets",
          "Padding, structure, and waist suppression in suits",
          "What are vents in suits?",
        ],
      },
    ],
  },
  {
    src: "https://aws-s3-images.sertnation.com/thumbnails/personality-course.png",
    title: "Personality Development",
    desc: "This course helps to uplift your personality. Often when someone talks about personality, they usually mention outer personality i.e dressing sense, a good body, completely ignoring the importance of inner personality. The content covers all about outer and inner personality including the real meaning behind success. Personality Development is all about ",
    chapters: 9,
    hours: 3.5,
    person: "Mayank Negi",
    attr: "Life coach",
    modules: [
      {
        title: "Chapter 1: Introduction",
        desc: [
          "Personality development and individuality ",
          "How does personality affect personal and work life?",
          "What are some misconceptions related to PD?",
        ],
      },
      {
        title: "Chapter 2: Outer Personality Development",
        desc: [
          "How to maintain physical fitness?",
          "Some ways to keep yourself fit",
          "What are some benefits and importance?",
        ],
      },
      {
        title: "Chapter 3: Diet",
        desc: [
          "What is a perfect diet?",
          "What are macros and how to calculate them?",
          "Why is calculating TDEE is important?",
          "Protein, carbs, and fat intake",
          "How to use food tracking apps?",
          "How to use micros like fibers, vitamins for a balanced diet?",
        ],
      },
      {
        title: "Chapter 4: Posture",
        desc: [
          "What is a good posture?",
          "What is Lordosis, Kyphosis, Scoliosis?",
          "What are the remedies to a bad posture?",
          "How do mattress and clothing affect posture?",
        ],
      },
      {
        title: "Chapter 5: Personal Grooming",
        desc: [
          "How does clothing affect your personality?",
          "How to use personal grooming tools properly?",
          "Body odor and how does weather affect it?",
        ],
      },
      {
        title: "Chapter 6: Inner Personality Development",
        desc: [
          "What is kinesis?",
          "What is good body language?",
          "How does handshake, eye contact, hand gesture impact personality?",
          "What are the factors to avoid?",
          "What is leadership?",
          "How do transparency and decision-making make a good leader?",
        ],
      },
      {
        title: "Chapter 7: Listening Skills",
        desc: [
          "What is active listening?",
          "How to 'listen' with good body language?",
          "Impact of a smile on another person",
          "How to ask questions and open people about themselves?",
        ],
      },
      {
        title: "Chapter 8: Be Yourself",
        desc: [
          "What is individuality and how should you be yourself?",
          "How to accept yourself?",
          "Importance of moving on from past mistakes",
        ],
      },
      {
        title: "Chapter 9: Success",
        desc: [
          "What is the real meaning of success?",
          "How does success vary from individual to individual?",
          "How do set divide and set goals?",
          "What is financial independence?",
          "What approach you can take to be financially independent? ",
          "How to use your skills to earn?",
          "How Sert Nation helps you to earn and develop your skills?",
        ],
      },
    ],
  },
  {
    src: "https://aws-s3-images.sertnation.com/thumbnails/social-media-course.png",
    title: "Social Media Marketing",
    desc: "Learn all about social media in this course. This 3-hour course covers everything about growth on social media. Social media is a new media technology that can expand your point of view on different subjects and gives a highlight to the original content. Whether you manage a brand or do personal branding, this course will help you grow on social media. This course is covered by Krishna Negi, who started working with startups and brands, managing their social media, and creating content early in his career. He currently is the owner of 3 start-ups including the co-owner of Sert Nation. ",
    chapters: 9,
    hours: 3.5,
    person: "Krishna Negi",
    attr: "Content creator, Online Marketing Expert and Co-founder of Sert Nation",
    modules: [
      {
        title: "Chapter 1:  Introduction to Social Media Marketing",
        desc: [
          "What is social media marketing?",
          "Traditional marketing v/s Social media marketing",
          "How to integrate both types of marketings in your plan?",
          "What are the important aspects of social media marketing?",
          "What are the advantages of social media marketing?",
        ],
      },
      {
        title: "Chapter 2: Knowing Your Business",
        desc: [
          "Niche v/s mainstream business",
          "How to categorize your audience?",
          "Based on-",
          "1. Age group",
          "2. Work(where)",
          "3. Income bracket",
          "4. Location",
          "5. Engagement with products",
          "How to use taglines and wordplays for your brand?",
          "How to time your business on basis of economic, political, and cross-cultured factors?",
          "What is a purchase funnel? And how to keep your audience loyal?",
        ],
      },
      {
        title: "Chapter 3: Content Creation",
        desc: [
          "How to select a good display picture?",
          "How to create a good bio?",
          "What should be the word limit in captions?",
          "Creating content with images",
          "How to use Instagram stories to your maximum benefit?",
        ],
      },
      {
        title: "Chapter 4: Content Creation (Color Combination)",
        desc: [
          "How to use the color combination on the basis of your post?",
          "What does the right color deliver the message of your post?",
          "How can colors help to increase your engagement?",
        ],
      },
      {
        title: "Chapter 5: Video Creation",
        desc: [
          "Why is creating video important?",
          "How to edit the videos?",
          "Why are reels and IGTV important in 2021?",
          "How to create behind the scenes for your audience?",
        ],
      },
      {
        title: "Chapter 6: Grow Your Audience",
        desc: [
          "How to use hashtags to increase engagements? ",
          "Scouting your competitors ",
          "Why is reposting content important for your brand?",
          "What are some tricks to grow your audience?",
        ],
      },
      {
        title: "Chapter 7: Partnership Strategy",
        desc: [
          "Why is it important to find a perfect partner for your brand?",
          "Important factors like demography impacting partnership strategy",
          "How should you look for a non-competitive partner",
          "Why is writing a good pitch important?",
          "What are Youtuber collaborations?",
          "Types of exchange and what should you select for your brand?",
        ],
      },
      {
        title: "Chapter 8: Youtube Collaborations",
        desc: [
          "What are Youtuber collaborations?",
          "Types of exchange and what should you select for your brand?",
          "Creating a need for your product",
        ],
      },
      {
        title: "Chapter 9: Ads And Promotion",
        desc: [
          "What are the types of promotion?",
          "Ads cost on Instagram and Facebook",
          "What is Facebook Marketing? and how to utilize it for free?",
          "Key features to keep in mind while promoting your brand.",
          "How to use discounts to attract an audience?",
        ],
      },
    ],
  },
];

const PurhcaseVideoCmp = () => {
  const [authS] = useContext(AuthContext);
  const [state, setState] = useState({ loading: false, error: false });

  async function handleBuyCourse() {
    try {
      setState({ loading: true, error: false });

      const response = await AuthWebClient.post(
        `api/user/${authS.user._id}/subscription/purchase`,
        {
          subscriptionId: "5fff1a8fdbdc036e0aa91c3e",
        }
      );

      await displayRazorpay(authS.user, response.data, () => {});

      setState({ loading: false, error: false });
    } catch (error) {
      setState({ loading: false, error: true });
    }
  }

  return (
    <Box>
      <Container>
        <Box pb={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" color="primary" onClick={() => {}}>
              Sert Nation
            </Link>
            <Typography color="textPrimary">Videos</Typography>
          </Breadcrumbs>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <Box display="flex" flexDirection="column">
              <Box width="100%">
                <img
                  src="https://aws-s3-images.sertnation.com/thumbnails/course-pack.png"
                  alt=""
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box pt={2} pl={2}>
              <Typography variant="h6">Sert Z Video Courses</Typography>
              <Box pt={1} />
              <Typography variant="body1" color="textPrimary">
                Premium video series by Sert Nation on must needed modern
                skills, which includes:
                <br />
                ‣ 4 volumes
                <br />
                ‣ Spanned across 28 Chapters
                <br />‣ A total of 10+ hours of content.
              </Typography>
              <Box pt={2} />
              <Typography variant="body1">Price</Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h6">₹2499</Typography>
                <Box pl={1} />
                <Typography
                  variant="body2"
                  style={{ textDecoration: "line-through" }}
                >
                  ₹2999
                </Typography>
              </Box>
              <Typography variant="caption" color="textSecondary">
                Discount valid till 15th July only
              </Typography>
            </Box>
            <Box pt={1} />
            <a href="#purhcase" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                style={{ padding: "8px 32px" }}
              >
                <strong>buy now</strong> <ArrowRight />
              </Button>
            </a>
          </Grid>
        </Grid>
      </Container>
      <Box py={{ xs: 2, md: 4 }} bgcolor={colors.grey[200]} mt={2}>
        <Container>
          <Typography variant="h6">Details of the Volumes</Typography>
          <Box pt={2} />
          <Grid container>
            {courses.map((item) => (
              <VolumeItem item={item} />
            ))}
          </Grid>
        </Container>
      </Box>
      <a id="purhcase" href="/"></a>
      <Box py={{ xs: 2, md: 4 }} mt={2}>
        <Container>
          <Typography variant="h6">Buy Sert Z Video Course</Typography>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Box width="100%">
                <img
                  src="https://aws-s3-images.sertnation.com/thumbnails/course-pack.png"
                  alt=""
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box pt={1}>
                <Typography>Included in bundle:</Typography>
                <Typography>
                  ‣ 4 Volumes
                  <br />
                  ‣ 28 Chapters
                  <br />
                  ‣ 10+ hours of Content
                  <br />‣ Lifetime availability
                </Typography>
              </Box>
              <Box py={2}>
                <Divider />
              </Box>
              <Box>
                <BillItem label="Price" value={2999} />
                <BillItem label="Discount" value={-500} />
                <Box py={1}>
                  <Divider />
                </Box>
                <BillItem label="Total" value={2499} />
                <Box py={1}>
                  <Divider />
                </Box>
                <Box pt={1} />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={state.loading}
                  disableElevation
                  onClick={handleBuyCourse}
                >
                  <strong>Open Payment Page</strong>
                </Button>
                <br />
                <Typography variant="caption" color="textSecondary">
                  You will get Sert Z membership for free with this course{" "}
                  <Link href="/affiliate">Click to know more</Link>
                </Typography>
                <Typography>{state.error}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

const BillItem = ({ value, label }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography>{label}</Typography>
      <Typography>
        <strong>{formatCurrency(value)}</strong>
      </Typography>
    </Box>
  );
};

const VolumeItem = ({ item }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12}>
      <Box
        display="flex"
        flexDirection={isXs ? "column" : "row"}
        alignItems={isXs ? "center" : "flex-start"}
      >
        <Box width={250}>
          <img src={item.src} alt="" />
        </Box>
        <Box display="flex" flexDirection="column" pt={2}>
          <Typography variant="h6">
            <strong>{item.title}</strong>
          </Typography>
          <Typography variant="body2">{item.desc}</Typography>
          <Box pt={1} />
          <Typography>
            ‣ {item.chapters} Chapters{" "}
            <Link>
              <Typography
                variant="body2"
                component="span"
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
              >
                {open ? "View Less" : "View More"}
              </Typography>
            </Link>
          </Typography>
          {open && (
            <Box p={2} bgcolor={colors.grey[300]} borderRadius={4} my={1}>
              {item.modules?.map((chap) => (
                <Box pb={2}>
                  <Typography>
                    <strong>{chap.title}</strong>
                  </Typography>
                  <Box pt={0.5} />
                  {chap.desc.map((text) => (
                    <Typography variant="body2">{text}</Typography>
                  ))}
                </Box>
              ))}
            </Box>
          )}
          <Typography>‣ {item.hours} Hours content</Typography>
          <Typography>
            ‣ By {item.person} - {item.attr}
          </Typography>
        </Box>
      </Box>
      <Box py={2}>
        <Divider />
      </Box>
    </Grid>
  );
};

export default PurhcaseVideoCmp;
