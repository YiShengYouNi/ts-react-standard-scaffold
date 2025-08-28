// query key, 放在 key.ts，作为 单一事实来源（SSOT）
//  React Query 的核心就是用 query key 标识缓存（缓存在内存中）
export const QK = {
  todos: () => ['todos'] as const,
};

/**
 * 
 * 第一个元素，相当于 命名空间，起到分类的效果
 * export const QK = {
  // 列表
  orders: (filters?: { status?: string }) =>
    ['orders', filters] as const,

  // 详情
  order: (id: number) =>
    ['orders', id] as const,

  // 统计
  orderStats: () =>
    ['orders', 'stats'] as const,
}
 */
