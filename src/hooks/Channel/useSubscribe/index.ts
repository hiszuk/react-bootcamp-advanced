import {
  useInsertSubscribeMutation,
  SubsribersDocument,
  UserByIdDocument
} from "../../../utils/graphql/generated";

type SubscribeProps = {
  userid: string;
  subscribeId: string;
};

export const useSubscribe = () => {
  const [insertSubscription, { data, error }] = useInsertSubscribeMutation({
    refetchQueries: [UserByIdDocument, SubsribersDocument],
  });

  const subscribe = async ({ userid, subscribeId }: SubscribeProps) => {
    if (userid && subscribeId) {
      try {
        await insertSubscription({
          variables: {
            userid: userid,
            subscribe_id: subscribeId
          }
        });

        if (error) {
          console.log(error.message);
        }
      } catch (e) {
        new Error("チャネル登録に失敗");
      }
    }
  };

  return {
    subscribe,
    data,
    error,
  };
};
