"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  IoChevronBack,
  IoChevronForward,
  IoFishOutline,
  IoFlameOutline,
  IoIceCreamOutline,
  IoLeafOutline,
  IoRestaurantOutline,
  IoStarOutline,
} from "react-icons/io5";
import { TbBowlChopsticks, TbBread, TbCrown, TbSoup } from "react-icons/tb";
import { formatMenuPrice, type MenuCategory, type MenuIcon } from "@/lib/menu";

const icons: Record<MenuIcon, IconType> = {
  leaf: IoLeafOutline,
  soup: TbSoup,
  flame: IoFlameOutline,
  noodles: TbBowlChopsticks,
  restaurant: IoRestaurantOutline,
  crown: TbCrown,
  fish: IoFishOutline,
  star: IoStarOutline,
  bread: TbBread,
  dessert: IoIceCreamOutline,
};

/** Category tabs: only the selected category's dishes are shown. */
export default function MenuBrowser({ categories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const index = Math.max(0, categories.findIndex((c) => c.id === activeId));
  const active = categories[index];
  const prev = categories[index - 1];
  const next = categories[index + 1];

  // Open the category named in the URL (e.g. /menu#raan), on load and when the hash changes.
  useEffect(() => {
    const openFromHash = () => {
      const fromHash = window.location.hash.slice(1);
      if (categories.some((c) => c.id === fromHash)) setActiveId(fromHash);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [categories]);

  // Keep the selected tab visible (centred) inside the scrolling tab bar.
  // Instant on purpose: a smooth scroll here gets cancelled by the browser when the
  // page itself is scrolling to the dish list at the same moment.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const bar = tabsRef.current;
      const tab = bar?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
      if (!bar || !tab) return;
      const left = tab.getBoundingClientRect().left - bar.getBoundingClientRect().left + bar.scrollLeft;
      bar.scrollLeft = left - (bar.clientWidth - tab.offsetWidth) / 2;
    });
    return () => cancelAnimationFrame(frame);
  }, [activeId]);

  const select = (id: string) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
    // Bring the list into view if the user has scrolled past its start.
    const panel = panelRef.current;
    if (panel && panel.getBoundingClientRect().top < 0) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const ActiveIcon = icons[active.icon];

  return (
    <>
      <nav className="menu-nav-sticky" aria-label="Menu categories">
        <div className="container">
          <div className="menu-nav-scroll menu-tabs" ref={tabsRef} role="tablist">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                data-id={c.id}
                aria-selected={c.id === activeId}
                aria-controls="menu-panel"
                className={`menu-nav-link${c.id === activeId ? " active" : ""}`}
                onClick={() => select(c.id)}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="section menu-details" aria-label="Menu">
        <div className="container">
          <div id="menu-panel" role="tabpanel" ref={panelRef} key={active.id} className="menu-panel">
            <div className="menu-section-header">
              <h2 className="menu-section-title">
                <ActiveIcon aria-hidden="true" />
                {active.title}
              </h2>
              <span className="menu-section-tag">
                {active.items.length} {active.items.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            <ul className="menu-cards">
              {active.items.map((item) => (
                <li key={item.name} className="menu-item-card">
                  <div className="menu-item-photo">
                    {item.image ? (
                      <Image
                        src={item.image}
                        width={480}
                        height={360}
                        alt={item.name}
                        sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
                        className="menu-item-img"
                      />
                    ) : (
                      // No photo yet: show the category icon instead of an empty box.
                      <div className="menu-item-nophoto" aria-hidden="true">
                        <ActiveIcon />
                      </div>
                    )}
                  </div>

                  <div className="menu-item-body">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className={`menu-item-price${item.price === undefined ? " is-text" : ""}`}>
                      {formatMenuPrice(item.price)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="menu-panel-footer">
              {prev ? (
                <button type="button" className="menu-step" onClick={() => select(prev.id)}>
                  <IoChevronBack aria-hidden="true" />
                  <span>{prev.title}</span>
                </button>
              ) : (
                <span />
              )}

              {next ? (
                <button type="button" className="menu-step is-next" onClick={() => select(next.id)}>
                  <span>{next.title}</span>
                  <IoChevronForward aria-hidden="true" />
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
