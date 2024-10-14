import { useQuery } from "@tanstack/react-query";

import SmallBadge from "@/components/smallBadge/SmallBadge";
import { API_URL } from "@/constants/api_url";
import { tokenManager } from "@/services/auth/tokenManager";

export default function TalkFormHeader() {
  const accessToken = tokenManager.getToken();
  const { data: myData } = useQuery({
    queryKey: ["myInfo"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/my/userInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access: `${accessToken}`,
        },
      });

      const data: MyInfo = await res.json();
      return data;
    },
  });

  const { data: badges } = useQuery({
    queryKey: ["myBadges"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/my/BadgeByUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access: `${accessToken}`,
        },
      });

      const data: ObtainedBadge[] = await res.json();
      return data;
    },
  });

  return (
    <div className="absolute left-5 top-4 flex items-center Tablet:top-5">
      <p className="mr-3 text-Silver Text-s-Bold">{myData?.nickname}</p>

      {badges?.length !== 0 && (
        <section className="flex h-full gap-1">
          {badges?.map((el, i) => (
            <SmallBadge
              key={i}
              content={el.badge_name}
              withoutContent
              size="sm"
            />
          ))}
        </section>
      )}
    </div>
  );
}
