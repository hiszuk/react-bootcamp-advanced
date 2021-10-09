import {
  useDeleteSubscribeMutation,
  SubsribersDocument,
  UserByIdDocument
} from "../../../utils/graphql/generated";

type UnSubscribeProps = {
  userid: string;
  subscribeId: string;
};

export const useUnSubscribe = () => {
  const [deleteSubscription, { data, error }] = useDeleteSubscribeMutation({
    refetchQueries: [UserByIdDocument, SubsribersDocument],
  });

  const unsubscribe = async ({ userid, subscribeId }: UnSubscribeProps) => {
    if (userid && subscribeId) {
      try {
        await deleteSubscription({
          variables: {
            userid: userid,
            subscribe_id: subscribeId
          }
        });

        if (error) {
          console.log(error.message);
        }
      } catch (e) {
        new Error("チャネル登録解除に失敗");
      }
    }
  };

  return {
    unsubscribe,
    data,
    error,
  };
};
