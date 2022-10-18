import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFeed } from "../../api/feedApi";
import { Container, Container1200 } from "../../components/common/Containers";
import FeedEditForm from "../../components/Feed/FeedEditForm";

function FeedEditPage() {
  const { id } = useParams();
  const { data } = useQuery(["editFeed"], () => getFeed(parseInt(id!)), {
    refetchOnWindowFocus: false,
  });

  return (
    <Container>
      <Container1200>
        {data && <FeedEditForm {...data} isEditing={true} />}
      </Container1200>
    </Container>
  );
}

export default FeedEditPage;
