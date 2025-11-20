import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// MUI
import { useTheme } from "@mui/material/styles";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

// Config
import { APP_DEFAULT_PATH } from "@/config";
import menuItems from "@/menu";
import { generateFocusStyle } from "@/utils/generateFocusStyle";

// Icons
import { IconChevronRight } from "@tabler/icons-react";

const homeBreadcrumb = { title: "Home", url: APP_DEFAULT_PATH };

export default function Breadcrumbs({ data }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [activeItem, setActiveItem] = useState();

  useEffect(() => {
    if (data?.length) {
      dataHandler(data);
    } else {
      for (const menu of menuItems.items) {
        if (menu.type === "group") {
          const matchedParents = findParentElements(menu.children || [], location.pathname);
          dataHandler(matchedParents || []);
          if (matchedParents) break;
        }
      }
    }
  }, [data, location]);

  const dataHandler = (data) => {
    const active = data.at(-1);
    const linkItems = data.slice(0, -1);
    if (active && active.url !== homeBreadcrumb.url) {
      linkItems.unshift(homeBreadcrumb);
    }
    setActiveItem(active);
    setBreadcrumbItems(linkItems);
  };

  function findParentElements(navItems, targetUrl, parents = []) {
    for (const item of navItems) {
      const newParents = [...parents, item];

      if (item.url && targetUrl.includes(item.url)) {
        return newParents;
      }

      if (item.children) {
        const result = findParentElements(item.children, targetUrl, newParents);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" separator={<IconChevronRight size={16} />}>
      {breadcrumbItems.length > 0 &&
        breadcrumbItems.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              p: 0.5,
              color: "grey.700",
              textDecoration: "none",
              cursor: "pointer",
              ":hover": { color: "primary.main" },
              ":focus-visible": {
                outline: "none",
                borderRadius: 0.25,
                ...generateFocusStyle(theme.palette.primary.main),
              },
            }}
            onClick={() => navigate(item.url)} // Use navigate instead of Link
          >
            {item.title}
          </Typography>
        ))}
      {activeItem && (
        <Typography variant="body2" sx={{ p: 0.5 }}>
          {activeItem.title}
        </Typography>
      )}
    </MuiBreadcrumbs>
  );
}

Breadcrumbs.propTypes = { data: PropTypes.array };
